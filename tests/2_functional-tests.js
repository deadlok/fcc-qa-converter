const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    // #1
    test('Convert a valid input', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=10L')
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum,10)
            assert.equal(res.body.initUnit,'L')
            assert.equal(res.body.returnNum,2.64172)
            assert.equal(res.body.returnUnit,'gal')
            assert.equal(res.body.string,'10 liters converts to 2.64172 gallons')
            done();
        });
    });

    // #2
    test('Convert an invalid unit', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=32g')
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, '"invalid unit"');
            done();
        });
    });

    // #3
    test('Convert an invalid number', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kg')
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, '"invalid number"');
            done();
        });
    });

    // #4
    test('Convert an invalid number and unit', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilograms')
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, '"invalid number and unit"');
            done();
        });
    });

    // #5
    test('Convert with no number', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=kg')
        .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.initNum,1)
            assert.equal(res.body.initUnit,'kg')
            assert.equal(res.body.returnNum,2.20462)
            assert.equal(res.body.returnUnit,'lbs')
            assert.equal(res.body.string,'1 kilograms converts to 2.20462 pounds')
            done();
        });
    });
    
});
