var fs = require('fs');
import { calAccess } from "../index"
import { getContributionsReceived } from "../src/committee/contributions-received";

async function calAccessTests() {
  // const results = await calAccess.getFilings('6/16/2022');
  // // console.log({ results: results })
  // console.log( results.slice(-5))
  // console.log({ count: results.length })

  await getContributionsReceived('1343619', '2021');
}
;(async () => {
  await calAccessTests();
})()
