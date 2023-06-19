import { Injectable } from '@nestjs/common';
// import puppeteer from 'puppeteer';
import { Observable, from } from 'rxjs';
import * as pdf from 'html-pdf';

@Injectable()
export class PdfCreator {
  get(html: string): Observable<Buffer> {
    return this.crate_pdf(html);
  }

  private crate_pdf(html: string) {
    return new Observable<Buffer>((observer) => {
      pdf
        .create(html, {
          format: 'A4',
        })
        .toBuffer((err, buffer) => {
          if (err) {
            observer.error(err);
          } else {
            console.log('buffer', buffer);

            observer.next(buffer);
            observer.complete();
          }
        });
    });
  }

  // private async crate_pdf(html: string, templateName?: string) {
  //   try {
  //     const browser = await puppeteer.launch({ headless: true });
  //     const page = await browser.newPage();
  //     await page.setContent(html);
  //     const pdf = await page.pdf({ format: 'A4' });
  //     await browser.close();
  //     return pdf;
  //   } catch (e) {
  //     throw e;
  //   }
  // }
}
