# Campaign Finance web scrapper for Cal-Access. 

Node.js Library for scrapping campaign finance information from the California’s campaign disclosure website [Cal-Access](https://cal-access.sos.ca.gov/default.aspx).

The library currently supports scraping the following data: 
* [All Filings by Date](https://cal-access.sos.ca.gov/Campaign/Other/) by state committees.
* Contributions Received by a committee during and election cycle.
* Contributions Made by a committee during and election cycle.
* Expenditures Made by a committee during and election cycle
* Late and $5000+ Contributions Received  by a committee during and election cycle.
* Late Contributions Made by a committee during and election cycle.
* Late Independent Expenditures by a committee during and election cycle.

Installation


Usage

## Filings by Date
```
import { filings } from '../src';

;(async () => {
  const filingsList =  await filings.getFilings('6/20/2022');
  console.log(filingsList);
})();
```

### output
```
[
  {
    committeeName: 'SUTTER COUNTY REPUBLICAN CENTRAL COMMITTEE',
    committeeID: '1018341',
    formName: 'Late Contribution Report',
    formCode: 'F497',
    period: 'For Period: 06/21/2022 - 06/21/2022',
    fromPeriod: '06/21/2022',
    toPeriod: '06/21/2022',
    session: '2021',
    filingId: '2694505',
    amendId: '0'
  },
  {
    committeeName: "O'DONNELL FOR ASSEMBLY 2022",
    committeeID: '1435599',
    formName: 'Late Contribution Report',
    formCode: 'F497',
    period: 'For Period: 06/20/2022 - 06/20/2022',
    fromPeriod: '06/20/2022',
    toPeriod: '06/20/2022',
    session: '2021',
    filingId: '2694503',
    amendId: '0'
  },
  ...
]
```


Terms
* filingID
* session