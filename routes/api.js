'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.route('/api/convert')
  .get((req, res) => {

    const input = req.query.input
    const c = new ConvertHandler()

    let initNum
    let initUnit
    let errs = []

    try {
      initNum = c.getNum(input);
    } catch (e) {
      //console.log('Invalid number')
      errs.push(e)
    }

    try {
      initUnit = c.getUnit(input);
    } catch (e) {
      //console.log('Invalid unit')
      errs.push(e)
    }
    
    //console.log("errors:" + errs)
    if (errs.length > 1) res.json("invalid number and unit")
    else if (errs.length == 1) {
      //console.log(typeof(errs[0].message))
      res.json(errs[0].message)
    }
    else {
      //console.log("initNum: " + initNum)
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
      res.json(result)
    }
  })

};
