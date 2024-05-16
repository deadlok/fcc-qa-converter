const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Unit Test', function(){
        assert.equal(convertHandler.getNum('12 lbs'), '12', 'should correctly read a whole number input');
        assert.equal(convertHandler.getNum('12.05 lbs'), '12.05', 'shuold correctly read a decimal number input');
        assert.equal(convertHandler.getNum('2/5 lbs'), '0.4', 'should correctly read a fractional input');
        assert.equal(convertHandler.getNum('2.5/10 lbs'), '0.25', 'should correctly read a fractional input with a decimal');
        assert.throws(()=>{convertHandler.getNum('2/5/10 lbs')}, Error, 'should return an error on double-fraction');

    })
});