var assert = require('chai').assert;
var rewire = require("rewire");

import { getLateContributionsMade } from '../src/committee/late-contributions-made';
import { getLateContributionsReceived } from '../src/committee/late-contributions-received';
import { getLateIndependentExpenditures } from '../src/committee/late-independent-expenditures';
// var contributions = rewire('../src/committee/contributions-contributions');
// var convertToDate = contributions.__get__('convertToDate');
// var getFilingsForDate = contributions.__get__('getFilingsForDate');

describe('late contributions', function () {

  describe('LateContributionsMade', function () {
    let contributions: any;
    const filingID = '1343619';
    const session = '2021';
    const keyNames = ['name_of_contributor', 'city', 'state_zip', 'id_number', 'employer', 'occupation', 'amount', 'transaction_date', 'type','transaction_date', 'filed_date', 'transaction_number'];

    before(`Running getLateContributionsMade()`, async function () {
      this.timeout(40000);
      contributions = await getLateContributionsMade(filingID, session);
    });

    it('contributions with input', function () {
      assert.isArray(contributions, 'returns an array');
    });

    it('array length should be greater than 0', function () {
      assert(contributions.length > 0, 'contributions.length is greater than 0');
    });

    describe('first filing', function () {
      const keys = keyNames;

      it('should contain keys', function () {
        assert.hasAllKeys(contributions[0], keys, `contributions[0] ${keys}`);
      });
    });
  });

  describe('LateContributionsReceived', function () {
    let contributions: any;
    const filingID = '1414018';
    const session = '2021';
    const keyNames = ['name_of_contributor', 'city', 'state_zip', 'id_number', 'employer', 'occupation', 'amount', 'transaction_type', 'type','transaction_date', 'filed_date', 'transaction_number'];

    before(`Running LateContributionsReceived()`, async function () {
      this.timeout(40000);
      contributions = await getLateContributionsReceived(filingID, session);
    });

    it('contributions with input', function () {
      assert.isArray(contributions, 'returns an array');
    });

    it('array length should be greater than 0', function () {
      assert(contributions.length > 0, 'contributions.length is greater than 0');
    });

    describe('first filing', function () {
      const keys = keyNames;

      it('should contain keys', function () {
        assert.hasAllKeys(contributions[0], keys, `contributions[0] ${keys}`);
      });
    });
  });

  describe('LateIndependentExpenditures', function () {
    let expenditures: any;
    const filingID = '1422549';
    const session = '2021';
    const keyNames = ['name_of_contributor', 'city', 'state_zip', 'id_number', 'employer', 'occupation', 'amount', 'transaction_type', 'type','transaction_date', 'filed_date', 'transaction_number'];

    before(`Running LateIndependentExpenditures()`, async function () {
      this.timeout(40000);
      expenditures = await getLateIndependentExpenditures(filingID, session);
    });

    it('contributions with input', function () {
      assert.isArray(expenditures, 'returns an array');
    });

    it('array length should be greater than 0', function () {
      assert(expenditures.length > 0, 'expenditures.length is greater than 0');
    });

    describe('first filing', function () {
      const keys = keyNames;

      it('should contain keys', function () {
        assert.hasAllKeys(expenditures[0], keys, `expenditures[0] ${keys}`);
      });
    });
  });


});
