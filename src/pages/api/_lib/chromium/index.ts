import puppeteer, { Page } from 'puppeteer-core';

import { handler } from './chromiumOptions';

let _page: Page;

const getPage = async () => {
  if (_page) {
    return _page;
  }

  const options = await handler();
  const browser = await puppeteer.launch(options);

  _page = await browser.newPage();

  return _page;
}

export const getScreenshot = async (html: string) => {
  const page = await getPage();

  await page.setViewport({
    width: 1200,
    height: 630
  });
  await page.setContent(html);

  const file = await page.screenshot({
    type: 'png'
  });

  return file;
}