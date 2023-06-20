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
      const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'],
        // executablePath: '/usr/bin/chromium-browser',
        // executablePath: '/usr/bin/chromium',
        executablePath: '/usr/bin/google-chrome',
      });
      const page = await browser.newPage();
      await page.setContent(html);
      const pdf = await page.pdf({ format: 'A4' });
      await browser.close();
      return pdf;
    } catch (e) {
      throw e;
    }
  }
}
