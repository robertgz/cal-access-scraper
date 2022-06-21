var assert = require('chai').assert;
import { getContributionsMade } from '../src/committee/contributions-made';
import { getContributionsReceived } from '../src/committee/contributions-received'

describe('contributions', function () {

  describe('ContributionsReceived', function () {
    let results: any;
    const filingID = '1343619';
    const session = '2021';
    const keyNames = [
      'name_of_contributor', 'payment_type', 'city', 'state', 'zip', 'id_number', 
      'employer', 'occupation', 'amount', 'transaction_date', 'filed_date','transaction_number'
    ];

    before(`Running getContributionsReceived() with input filingID and session`, async function () {
      this.timeout(40000);
      results = await getContributionsReceived(filingID, session);
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

  describe('ContributionsMade', function () {
    let results: any;
    const filingID = '1414274';
    const session = '2021';
    const keyNames = ['date', 'payee', 'contest', 'position', 'payment_type', 'amount'];

    before(`Running getContributionsMade() with input filingID and session`, async function () {
      this.timeout(40000);
      results = await getContributionsMade(filingID, session);
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
