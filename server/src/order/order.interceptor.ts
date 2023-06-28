import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import handlebars from 'handlebars';
import { PdfCreator } from './pdf.creator';
import { ORDER_PDF_TEMPLATE } from './templates/order-pdf-template';
import { Readable } from 'stream';
import * as moment from 'moment';
import { OrderService } from './services/order.service';

@Injectable()
export class OrderInterceptor implements NestInterceptor {
  constructor(
    private readonly pdfCreator: PdfCreator,
    private readonly orderService: OrderService,
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
      `Заказ мебельных фасадов от ${moment().format('DD.MM.YYYY')}`;

    const data: Order.Data = {
      header,
      facades,
      accessories,
      files,
    };

    const { files: _, ...importData } = data;

    const importFile = new Readable();
    importFile.push(JSON.stringify(importData));
    importFile.push(null);

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
      logger: false,
      debug: false,
      secureConnection: false,
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnAuthorized: true,
      },
    } as any;

    return this.orderService.create({ data: importData }).pipe(
      switchMap((ord) => {
        data.header.title = `Заказ ${ord.id} от ${moment().format(
          'DD.MM.YYYY',
        )}`;

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
              ord.id,
              textCompany,
              data.header!.title,
              data.files,
              pdf,
              importFile,
              options,
              from,
              to,
            ),
          ),
        );

        const sendDuplicateEmailObservable = convertToPDFObservable.pipe(
          switchMap((pdf) =>
            this.sendEmail(
              ord.id,
              this.clientText(ord.id, moment().format('DD.MM.YYYY')),
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
    importFile: Readable | null,
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
          filename: file.originalname,
          content: file.buffer,
        })),
      ],
    };
    if (importFile) {
      mailOptions.attachments.push({
        filename: `ORD_N${orderNumber}.avcd`,
        content: importFile,
      });
    }

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

  clientText(orderNumber: number, date: string): string {
    return `Уважаемый клиент,

    Благодарим Вас за ваш заказ! Мы ценим ваше доверие и обещаем обработать его в кратчайшие сроки. Наша команда уже занимается его обработкой и подготовкой к отправке.
    
    Во вложении вы найдете копию вашего заказа №${orderNumber} от ${date} для вашего удобства и контроля.
    
    Если у вас возникнут какие-либо вопросы или потребуется дополнительная информация, не стесняйтесь связаться с нашей службой поддержки. Мы всегда готовы помочь вам.
    
    Спасибо еще раз за ваш заказ! Мы ценим ваше сотрудничество.
    
    С наилучшими пожеланиями,
    Команда Facade-good`;
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
