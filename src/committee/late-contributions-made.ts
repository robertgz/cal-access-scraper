
import { getTSVData } from '../tsv-data';
import { downloadFile } from '../download';
import { LateContributionsMade } from '../types/late-contributions-made';

interface LateContributionsMadeTSV {
  'NAME OF CONTRIBUTOR': string;
  CITY: string;
  'STATE/ZIP': string;
  'ID NUMBER': string;
  EMPLOYER: string;
  OCCUPATION: string;
  AMOUNT: string;
  'TRANSACTION TYPE': string;
  TYPE: string;
  'TRANS. DATE': string;
  'FILED DATE': string;
  'TRANS #': string;
}

export const getLateContributionsMade = async (committeeID: string, session: string) => {
  const urlPrefix = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailLateExcel.aspx`;
  const pageURL = getDownloadUrl(urlPrefix, committeeID, session);

  const fileBuffer = await downloadFile(pageURL);
  if (!fileBuffer) return [];
  
  const recordsRaw = getTSVData<LateContributionsMadeTSV>(fileBuffer);
  const records = transformTSVToTransactions(recordsRaw);

  return records;
}

export const getDownloadUrl = (urlPrefix: string, committeeID: string, session: string): string => {
  return `${urlPrefix}?id=${committeeID}&session=${session}&view=LATE2`;
}

const transformTSVToTransactions = (transactions: LateContributionsMadeTSV[]): LateContributionsMade[] => {
  return transactions.map((transaction) => ({
    name_of_contributor: transaction['NAME OF CONTRIBUTOR'],
    city: transaction['CITY'],
    state_zip: transaction['STATE/ZIP'],
    id_number: transaction['ID NUMBER'],
    employer: transaction['EMPLOYER'],
    occupation: transaction['OCCUPATION'],
    amount: transaction['AMOUNT'],
    transaction_type: transaction['TRANSACTION TYPE'],
    type: transaction['TYPE'],
    transaction_date: transaction['TRANS. DATE'],
    filed_date: transaction['FILED DATE'],
    transaction_number: transaction['TRANS #'],
  }));
}
