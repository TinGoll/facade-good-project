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
        devtools: false,
        headless: 'new',
        // args: ['--no-sandbox', '--single-process'],
        args: [
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-first-run',
          '--no-sandbox',
          '--no-zygote',
          '--deterministic-fetch',
          '--disable-features=IsolateOrigins',
          '--disable-site-isolation-trials',
          // '--single-process',
        ],
        executablePath: '/usr/bin/chromium-browser',
        // executablePath: '/usr/bin/chromium',
        // executablePath: '/usr/bin/google-chrome',
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
