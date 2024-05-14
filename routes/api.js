'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  app.route('/api/convert')
  .get((req, res) => {
      const input = req.query.input
      console.log('Input: '+ input)
      const c = new ConvertHandler()
      let initNum = c.getNum(input);
      let initUnit = c.getUnit(input);
      let returnNum = c.convert(initNum, initUnit)
      let returnUnit = c.getReturnUnit(initUnit)
      let returnStr = c.getString(initNum, initUnit, returnNum, returnUnit)

      let result = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: returnStr
      }
      console.log("result: " + result);
      res.json(result)
  })

};
