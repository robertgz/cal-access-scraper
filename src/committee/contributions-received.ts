
const fetch = require('node-fetch2');
import {parse} from 'csv-parse/sync'

const fs = require('fs')

// https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsReceivedExcel.aspx?id=1343619&session=2021
const urlPrefixContributionsReceived = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsReceivedExcel.aspx`;

export const getContributionsReceived = async (committeeID: string, session: string) => {
  const contribData =  loadContributionsReceivedFromFile();
  const records: any[] = getContributionsFromCSV(contribData);
  console.log(records.slice(0, 3));
}

const loadContributionsReceivedFromFile = () => {
  const fileName = `${__dirname}\\..\\..\\..\\src\\committee\\export.tsv`;
  const file = fs.readFileSync(fileName)
  return file;
}

const downloadContributionsReceived = async () => {
  // const pageURL = `${urlPrefixContributionsReceived}?${getUrlParams(committeeID, session)}`;
  const pageURL = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsReceivedExcel.aspx?id=1343619&session=2021`; 
  const response = await fetch(pageURL);

 // const data = await (await fetch(pageURL)).arrayBuffer();
}

const getContributionsFromCSV = (input: string | Buffer) => {
  return parse(input, {
    delimiter: '\t',
    columns: true,
    skip_empty_lines: true,
  })
}

const getUrlParams = (committeeID: string, session: string): string => {
  return `id=${committeeID}&session=${session}`;
}
