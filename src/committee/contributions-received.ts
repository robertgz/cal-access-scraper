
// import fetch from 'node-fetch';
const fetch = require('node-fetch2');

// https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsReceivedExcel.aspx?id=1343619&session=2021
const urlPrefixContributionsReceived = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsReceivedExcel.aspx`;


export const getContributionsReceived = async (committeeID: string, session: string) => {
  // const pageURL = `${urlPrefixContributionsReceived}?${getUrlParams(committeeID, session)}`;
  const pageURL = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsReceivedExcel.aspx?id=1343619&session=2021`;

  const response = await fetch(pageURL);
  // const body = await response.blob();
  // const body = await response.body;
  // const blob = body.blob()

  console.log(response);
  // console.log(body);
  // console.log(blob);

}


const getUrlParams = (committeeID: string, session: string): string => {
  return `id=${committeeID}&session=${session}`;
}