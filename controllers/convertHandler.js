function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    let numStr = input.match(/^[0-9\/.]*/).toString();
    
    // Check dounble fraction
    chkSlash = numStr.match(/\//g)
    if (chkSlash != null) { 
      if (chkSlash.length > 1) throw new Error("invalid number");
    }
    // default 1 if no number preceding
    if (numStr=="") numStr = '1'

    // eval the result to numeric
    result = eval(numStr) 
    if (result == NaN) throw new Error("invalid number");

    console.log('getNum: '+ result);
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let numStrLen = input.match(/^[0-9\/.]*/).toString().length;
    //console.log(numStrLen)
    result = input.substring(numStrLen,input.length).trim().toLowerCase();
    //console.log("unitStr: "+ result)

    // verify unit
    if (!result.match(/^gal|l|lbs|kg|mi|km$/))
      throw new Error("invalid unit")

    if (result == 'l') result = 'L';

    console.log('getUnit: '+ result);
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit){
      case 'gal':
        result = "L";
        break;
      case 'L':
        result = "gal";
        break;
      case 'lbs':
        result = 'kg'
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = "km";
        break;
      case 'km':
        result = "mi";
        break;
      default:
        throw new Error('invalid unit')
    }

    console.log('getReturnUnit: '+ result);
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case 'gal':
        result = "gallons";
        break;
      case 'L':
        result = "liters";
        break;
      case 'lbs':
        result = 'pounds'
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = "miles";
        break;
      case 'km':
        result = "kilometers";
        break;
      default:
        throw new Error('invalid unit')
    }

    console.log('spellOutUnit: '+ result);

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit){
      case 'gal':
        result = initNum*galToL;
        break;
      case 'L':
        result = initNum/galToL;
        break;
      case 'lbs':
        result = initNum*lbsToKg;
        break;
      case 'kg':
        result = initNum/lbsToKg;
        break;
      case 'mi':
        result = initNum*miToKm;
        break;
      case 'km':
        result = initNum/miToKm;
        break;
      default:
        throw new Error('invalid unit')
    }

    if (result == NaN) throw new Error('invalid number')
    else result = Math.round((result+Number.EPSILON)*100000)/100000;

    console.log('convert:' + result)
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    console.log(initNum +' '+ initUnit +' '+ returnNum +' '+ returnUnit)
    result =   initNum.toString() + ' ' + this.spellOutUnit(initUnit) 
             + ' converts to ' 
             + returnNum.toString() + ' ' + this.spellOutUnit(returnUnit);

    console.log('getString: ' + result)
    return result;
  };
  
}

module.exports = ConvertHandler;
