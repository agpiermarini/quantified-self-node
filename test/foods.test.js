const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert; // import { assert } from "chai" //
const expect = chai.expect; // import { expect } from "chai" //
const pry = require('pryjs')
const app = require('../app')

chai.use(chaiHttp);

describe("Food endpoints", () => {
  describe("GET /api/v1/foods", () => {
    it('returns all foods in the database', (done) => {
      chai.request(app)
      .get('/api/v1/foods')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200)
        console.log(res.body)
        // expect(res.length).to.eql(2);
        done();
      })
    })
  })
});
