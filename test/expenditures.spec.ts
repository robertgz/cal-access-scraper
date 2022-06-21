var assert = require('chai').assert;
import { getExpendituresMade } from "../src/committee/expenditures-made";

describe('expenditures', function () {

  describe('ExpendituresMade', function () {
    let results: any;
    const filingID = '1343619';
    const session = '2021';
    const keyNames = [
     'date', 'payee', 'expenditure_code', 'description','amount'
    ];

    before(`Running getExpendituresMade() with input filingID and session`, async function () {
      this.timeout(40000);
      results = await getExpendituresMade(filingID, session);
    });

    it('should return an array', function () {
      assert.isArray(results, 'returns an array');
    });

    it('should return an array with length greater than 0', function () {
      assert(results.length > 0, 'array length is greater than 0');
    });

    it(`first array element should contain only keys`, function () {
      assert.hasAllKeys(results[0], keyNames, `element at index [0] has keys: ${keyNames}`);
    });
  });

});
