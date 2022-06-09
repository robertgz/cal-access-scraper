import { Page, chromium, Locator } from 'playwright';

interface Filing {
  committeeName: string;
  committeeID: string;
  formName: string;
  formCode: string; // F496, F460
  period: string;
  fromPeriod: string;
  toPeriod: string;
  session: string; // Odd years: 2010, 2021
  filingId: string;
  amendId: string;
}

export const getFilings = async (filingDate: string | Date): Promise<Filing[]> => {
  const date: Date = filingDate instanceof Date ? filingDate : new Date(filingDate);
  const pageURL = getViewDateURl(date);

  const browser = await chromium.launch({
    headless: true,
  });

  const page: Page = await browser.newPage();
  await page.goto(pageURL);

  let filings = [];

  const selector = `#_ctl3_btnSubmit + br + br ~ table`;

  const rows = await page.locator(selector);
  const count = await rows.count()

  for (let i = 0; i < count; ++i) {
    let row = await getRow(await rows.nth(i).locator(' > tbody'));
    filings.push(row);
  }

  await browser.close();
  return filings;
}

const getRow = async (row: Locator): Promise<Filing> => {
  const rows = row.locator(' > tr');
  const periods = getPeriods(await rows.nth(2).locator(' > td > span').nth(0).innerText());

  return {
    committeeName: await rows.nth(0).locator('> td > a').nth(0).innerText(),
    committeeID: getParam(await rows.nth(0).locator('> td > a').nth(0).getAttribute('href'), 'id'),
    formName: getFormName(await rows.nth(1).locator(' > td > span').nth(0).textContent()),
    formCode: getFormCode(await rows.nth(1).locator(' > td > span').nth(0).textContent()),
    period: await rows.nth(2).locator(' > td > span').nth(0).innerText(),
    fromPeriod: periods.from,
    toPeriod: periods.to,
    session: getParam(await rows.nth(0).locator('> td > a').nth(0).getAttribute('href'), 'session'),
    filingId: getFilingId(await rows.nth(2).locator(' > td > span').nth(1).innerText()),
    amendId: getParam(await rows.nth(1).locator(' > td > span > a').nth(0).getAttribute('href'), 'amendid'),
  }
}

const getFormName = (text: string | null): string => {
  return text ? text.split('(')[0].trim() : ''
}

const getFormCode = (text: string | null): string => {
  return text ? text.split('(')[1].split(')')[0].split(' ')[1].trim() : ''
}

const getFilingId = (text: string | null): string => {
  return text ? text.split('#')[1].trim() : '';
}

const getParam = (text: string | null, paramName: string): string => {
  const qString = text ? text.split('?')[1] : '';
  const searchParams = new URLSearchParams(qString);
  const param = searchParams.get(paramName);
  return param ? param : '';
}

const getPeriods = (text: string | null): { from: string, to: string } => {
  const periods = text?  text?.split(':')[1].split('-') : '';
  const from = periods[0] ? periods[0].trim() : '';
  const to = periods[1] ? periods[1].trim() : '';
  return { from, to }
}

const getViewDateURl = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `https://cal-access.sos.ca.gov/Campaign/Other/List.aspx?view=date&year=${year}&month=${month}&day=${day}`;
}
