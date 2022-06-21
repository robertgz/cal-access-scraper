import { parse } from 'csv-parse/sync';

export const getTSVData = <Type>(input: string | Buffer): Type[] => {
  return parse(input, {
    delimiter: '\t',
    columns: true,
    skip_empty_lines: true,
  });
}
