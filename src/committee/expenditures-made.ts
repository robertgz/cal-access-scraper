
import { getTSVData } from '../tsv-data';
import { downloadFile } from '../download';
import { ExpendituresMade } from '../types/expenditures-made';

interface ExpendituresMadeTSV {
  DATE: string;
  PAYEE: string;
  'EXPENDITURE CODE': string;
  DESCRIPTION: string;
  AMOUNT: string;
}

export const getExpendituresMade = async (committeeID: string, session: string): Promise<ExpendituresMade[]> => {
  const urlPrefix = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailExpendituresMadeExcel.aspx`;

  const pageURL = getDownloadUrl(urlPrefix, committeeID, session);
  const fileBuffer = await downloadFile(pageURL);
  if (!fileBuffer) return [];
  
  const recordsRaw = getTSVData<ExpendituresMadeTSV>(fileBuffer);
  const records = transformTSVToTransactions(recordsRaw);

  return records;
}

export const getDownloadUrl = (urlPrefix: string, committeeID: string, session: string): string => {
  return `${urlPrefix}?id=${committeeID}&session=${session}`;
}

const transformTSVToTransactions = (transactions: ExpendituresMadeTSV[]): ExpendituresMade[] => {
  return transactions.map((transaction) => ({
    date: transaction['DATE'],
    payee: transaction['PAYEE'],
    expenditure_code: transaction['EXPENDITURE CODE'],
    description: transaction['DESCRIPTION'],
    amount: transaction['AMOUNT'],
  }));
}
