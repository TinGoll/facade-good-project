import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { Observable, from } from 'rxjs';

@Injectable()
export class PdfCreator {
  get(html: string): Observable<Buffer> {
    return from(this.crate_pdf(html));
  }

  private async crate_pdf(html: string, templateName?: string) {
    try {
      const browser = await puppeteer.launch(); // запускаем браузер
      const page = await browser.newPage(); // создаем новую вкладку
      await page.goto(html, { waitUntil: 'networkidle0' });
      // const pdf = await page.pdf({ format: "A4", path: path.resolve(__dirname, templateName) }); // с сохранением файла.
      const pdf = await page.pdf({ format: 'A4' });
      await browser.close();
      return pdf;
    } catch (e) {
      throw e;
    }
  }
}
