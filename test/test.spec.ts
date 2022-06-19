import { getFilings } from '../src/filings'
var assert = require('chai').assert;
var rewire = require("rewire");

var filings = rewire('../src/filings');
var convertToDate = filings.__get__('convertToDate');
var getFilingsForDate = filings.__get__('getFilingsForDate');

describe('Filings', function () {
  describe('convertToDate()', function () {
    it('using input: string', function () {
      assert(convertToDate('6/4/2022') instanceof Date, 'returns an object of type Date');
    })
    it('using input: string and integer offset', function () {
      assert(convertToDate('6/4/2022', 2) instanceof Date, 'returns an object of type Date');
    })
  
    it('using a Date object as input', function () {
      assert(convertToDate(new Date('6/4/2022')) instanceof Date, 'returns an object of type Date');
    })
    it('using a Date object as input with integer offset', function () {
      assert(convertToDate(new Date('6/4/2022'), 3) instanceof Date, 'returns an object of type Date');
    })
  });
  
  describe('getFilingsForDate()', async function () {
    let filings: any;
    const date = new Date('6/4/2022');
  
    before(`Running getFilingsForDate() with Date object as input`, async function () {
      this.timeout(40000);
      filings = await getFilingsForDate(date);
    });
  
    it('should return an array', function () {
      assert.typeOf(filings, 'array', 'filings is an array');
    });
  
    it('array length should be greater than 0', function () {
      assert(filings.length > 0, 'filings.length is greater than 0');
    });
  
    describe('first filing', function () {
      it('should contain a property committeeName', function () {
        assert(filings[0].hasOwnProperty('committeeName'));
      });
  
      it('property committeeName should not be an empty string', function () {
        assert(filings[0].committeeName !== '');
      });
  
      it('should contain a property committeeID', function () {
        assert(filings[0].hasOwnProperty('committeeID'));
      });
  
      it('property committeeID should not be an empty string', function () {
        assert(filings[0].committeeID !== '');
      });
    });
  });
});  
