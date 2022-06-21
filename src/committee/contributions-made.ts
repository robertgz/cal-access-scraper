import { downloadFile } from "../download";
import { getTSVData } from "../tsv-data";
import { ContributionsMade } from "../types/contributions-made";

interface ContributionsMadeTSV {
  DATE: string;
  PAYEE: string;
  CONTEST: string;
  POSITION: string;
  'PAYMENT TYPE': string;
  AMOUNT: string;
}

export const getContributionsMade = async (committeeID: string, session: string): Promise<ContributionsMade[]> => {
  const urlPrefix = `https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsMadeExcel.aspx`;

  const pageURL = getDownloadUrl(urlPrefix, committeeID, session);

  const fileBuffer = await downloadFile(pageURL);
  if (!fileBuffer) return [];
  
  const recordsRaw = getTSVData<ContributionsMadeTSV>(fileBuffer);
  const records = transformTSVToTransactions(recordsRaw);

  return records;
}

export const getDownloadUrl = (urlPrefix: string, committeeID: string, session: string): string => {
  return `${urlPrefix}?id=${committeeID}&session=${session}`;
}

export const transformTSVToTransactions = (transactions: ContributionsMadeTSV[]): ContributionsMade[] => {
  return transactions.map((transaction) => ({
    date: transaction['DATE'],
    payee: transaction['PAYEE'],
    contest: transaction['CONTEST'],
    position: transaction['POSITION'],
    payment_type: transaction['PAYMENT TYPE'],
    amount: transaction['AMOUNT'],
  }));
}
