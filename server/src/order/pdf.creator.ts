import { Injectable } from '@nestjs/common';
// import puppeteer from 'puppeteer';
import { Observable, from } from 'rxjs';

import * as wkhtmltopdf from 'wkhtmltopdf';

@Injectable()
export class PdfCreator {
  get(html: string): Observable<Buffer> {
    return from(this.crate_pdf(html));
  }

  private async crate_pdf(html: string) {
    try {
      return new Promise<Buffer>((resolve, reject) => {
        wkhtmltopdf(html, {}, (error: any, stream: any) => {
          if (error) {
            reject(error);
          } else {
            const chunks: Buffer[] = [];
            stream.on('data', (chunk: Buffer) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', (error: any) => reject(error));
          }
        });
      });
    } catch (error) {
      console.error('Ошибка при создании PDF:', error);
      throw error;
    }
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
