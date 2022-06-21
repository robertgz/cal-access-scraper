import { Page, chromium } from 'playwright';
const fs = require('fs/promises');

export const downloadFile = async (pageURL: string): Promise<Buffer> => {
  const browser = await chromium.launch({
    headless: true,
  });

  let page: Page = await browser.newPage();

  try {
    const [ download ] = await Promise.all([
      page.waitForEvent('download'),
      page.goto(pageURL),
    ]);
  
    const path = await download.path();
    const file = await fs.readFile(path);
  
    return file;

  } catch (e) {
    throw e;
  } finally {
    await browser.close();
  }
}
