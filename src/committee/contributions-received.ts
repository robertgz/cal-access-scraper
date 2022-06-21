
import { getTSVData } from '../tsv-data';
import { downloadFile } from '../download';
import { ContributionsReceived } from '../types/contributions-received';

interface ContributionsReceivedTSV {
  'NAME OF CONTRIBUTOR': string;
  'PAYMENT TYPE': string;
  CITY: string;
  STATE: string;
  ZIP: string;
  'ID NUMBER': string;
  EMPLOYER: string;
  OCCUPATION: string;
  AMOUNT: string;
  'TRANSACTION DATE': string;
  'FILED DATE': string;
  'TRANSACTION NUMBER': string;
}

export const getContributionsReceived = async (committeeID: string, session: string): Promise<ContributionsReceived[]> => {
  const urlPrefix = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsReceivedExcel.aspx`;
  const pageURL = getDownloadUrl(urlPrefix, committeeID, session);

  const fileBuffer = await downloadFile(pageURL);
  if (!fileBuffer) return [];
  
  const recordsRaw = getTSVData<ContributionsReceivedTSV>(fileBuffer);
  const records = transformTSVToTransactions(recordsRaw);

  return records;
}

export const getDownloadUrl = (urlPrefix: string, committeeID: string, session: string): string => {
  return `${urlPrefix}?id=${committeeID}&session=${session}`;
}

const transformTSVToTransactions = (transactions: ContributionsReceivedTSV[]): ContributionsReceived[] => {
  return transactions.map((transaction) => ({
    name_of_contributor: transaction['NAME OF CONTRIBUTOR'],
    payment_type: transaction['PAYMENT TYPE'],
    city: transaction['CITY'],
    state: transaction['STATE'],
    zip: transaction['ZIP'],
    id_number: transaction['ID NUMBER'],
    employer: transaction['EMPLOYER'],
    occupation: transaction['OCCUPATION'],
    amount: transaction['AMOUNT'],
    transaction_date: transaction['TRANSACTION DATE'],
    filed_date: transaction['FILED DATE'],
    transaction_number: transaction['TRANSACTION NUMBER'],
  }));
}

