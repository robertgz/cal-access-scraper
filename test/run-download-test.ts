
import { committee, filings } from "../src";
import { getContributionsMade, getContributionsReceived, } from "../src/committee";
import { getFilings } from "../src/filings";

// ;(async () => {
//   // await getContributionsReceived('1343619', '2021');
//   // filings.getFilings('6/21/2022')
//   // const committees = await committee.getContributionsMade('1343619', '2021');
//   // console.log(committees);

//   const filingsList = await filings.getFilings('6/20/2022');
//   console.log(filingsList);
// })();

;(async () => {
  const filingDate = new Date('11/3/2020');
  const filingsList =  await filings.getFilings(filingDate);
  console.log(filingsList);
})();
