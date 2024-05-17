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
        assert.throws(()=>{convertHandler.getNum('2/5/10 lbs')}, Error, 'invalid number');
        assert.equal(convertHandler.getNum('lbs'), 1, 'default to a numerical input of 1');
        assert.equal(convertHandler.getUnit('1lbs'),'lbs','should correctly read each input unit');
        assert.throws(()=>{convertHandler.getUnit('1xyz')}, Error, 'invalid unit');
        assert.equal(convertHandler.getReturnUnit('lbs'),'kg','should correctly return unit');
        assert.equal(convertHandler.spellOutUnit('lbs'),'pounds','should correctly return spelled-out unit');
        
        assert.equal(convertHandler.convert(5, 'gal'), 18.92705 ,'should correctly convert gal to L');
        assert.equal(convertHandler.convert(5, 'L'), 1.32086 ,'should correctly convert gal to L');

        assert.equal(convertHandler.convert(5, 'mi'), 8.0467 ,'should correctly convert gal to L');
        assert.equal(convertHandler.convert(5, 'km'), 3.10686 ,'should correctly convert gal to L');

        assert.equal(convertHandler.convert(5, 'lbs'), 2.26796 ,'should correctly convert gal to L');
        assert.equal(convertHandler.convert(5, 'kg'), 11.02312 ,'should correctly convert gal to L');
    })
});