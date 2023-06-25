import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import handlebars from 'handlebars';
import { ORDER_TEMPLATE } from './templates/order-template';
import { PdfCreator } from './pdf.creator';
import { OrderDataService } from './services/order.data.service';
import { ORDER_PDF_TEMPLATE } from './templates/order-pdf-template';

const ORDER_NUMBER = 'order_number';
interface OrderData {
  orderNumber: number;
}

@Injectable()
export class OrderInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService,
    private readonly pdfCreator: PdfCreator,
    private readonly orderData: OrderDataService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const formData = request.body;
    const files = request.files;

    const header = JSON.parse(formData.header || '{}');
    const facades = JSON.parse(formData.facades || '[]');
    const accessories = JSON.parse(formData.accessories || '[]');

    const textCompany =
      formData.text ||
      `Заказ мебельных фасадов от ${new Date().toLocaleString()}`;
    const textDuplicate = `Благодарим Вас за заказ. Во вложении копия заказа в виде PDF.`;
    const data: Order.Data = {
      header,
      facades,
      accessories,
      files,
    };

    const host = process.env.SMPT_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const from = process.env.SMTP_USER;
    const to = process.env.EMAIL_COMPANY;

    const options = {
      service: 'gmail',
      port: Number(port),
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnAuthorized: true,
      },
    } as any;

    return this.orderData.get<OrderData>(ORDER_NUMBER, { orderNumber: 0 }).pipe(
      switchMap((ord) => {
        ord.orderNumber++;
        data.header.title = `Заказ ${
          ord.orderNumber
        } от ${new Date().toLocaleString()}`;

        const convertToHTMLObservable = this.convertToHTML(data).pipe(
          catchError((error) => {
            console.error('Ошибка при конвертации данных в HTML:', error);
            throw new HttpException(
              'Ошибка при конвертации данных в HTML',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        );

        const convertToPDFObservable = convertToHTMLObservable.pipe(
          switchMap((html) => this.convertToPDF(html)),
        );

        const sendCompanyEmailObservable = convertToPDFObservable.pipe(
          switchMap((pdf) =>
            this.sendEmail(
              ord.orderNumber,
              textCompany,
              data.header!.title,
              data.files,
              pdf,
              null,
              options,
              from,
              to,
            ),
          ),
        );

        const sendDuplicateEmailObservable = convertToPDFObservable.pipe(
          switchMap((pdf) =>
            this.sendEmail(
              ord.orderNumber,
              textDuplicate,
              `${data.header!.title} (facade-good.ru)`,
              [],
              pdf,
              null,
              options,
              from,
              `${data.header.mail}`,
            ),
          ),
        );

        const emailObservables = [
          sendCompanyEmailObservable,
          sendDuplicateEmailObservable,
        ];

        return forkJoin(emailObservables).pipe(
          tap(() => {
            this.orderData.set<OrderData>(ORDER_NUMBER, ord);
          }),
          switchMap(() => next.handle()),
          catchError((error) => {
            console.error('Ошибка при отправке письма:', error);
            throw new HttpException(
              'Ошибка при отправке письма',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        );
      }),
    );
  }

  convertToPDF(html: string) {
    return this.pdfCreator.get(html);
  }

  convertToHTML(formData: Order.Data): Observable<string> {
    const template = handlebars.compile(ORDER_PDF_TEMPLATE);
    const html = template(formData);
    return of(html);
  }

  sendEmail(
    orderNumber: number,
    text: string,
    subject: string,
    // html: string,
    files: any[],
    pdfBuffer: Buffer,
    importFile: any | null,
    options: any,
    from: string,
    to: string,
  ): Observable<void> {
    const transporter = nodemailer.createTransport(options);

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      // html: html,
      text: text,
      attachments: [
        {
          filename: `order_${orderNumber}.pdf`,
          content: pdfBuffer,
        },
        ...files.map((file) => ({
          filename: this.convertToTranslit(file.originalname),
          content: file.buffer,
        })),
      ],
    };

    return new Observable<void>((observer) => {
      transporter.sendMail(mailOptions, (error, info) => {
        console.log(error, info);
        if (error) {
          console.error('Ошибка при отправке письма:', error);
          observer.error(error);
        } else {
          console.log('Письмо успешно отправлено:', info.response);
          observer.next();
          observer.complete();
        }
      });
    });
  }

  convertToTranslit(cyrillicText: string): string {
    const cyrillicMap: { [key: string]: string } = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'yo',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'kh',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'sch',
      ъ: '',
      ы: 'y',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya',
      ' ': '-',
    };

    return cyrillicText
      .toLowerCase()
      .split('')
      .map((char) => cyrillicMap[char] || char)
      .join('');
  }
}
