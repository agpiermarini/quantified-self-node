const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert; // import { assert } from "chai" //
const expect = chai.expect; // import { expect } from "chai" //
const pry = require('pryjs')
const app = require('../app')

chai.use(chaiHttp);
//
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)


/* Clean database and run migrations/seeds before each test*/
describe('Meal endpoints', function() {
  beforeEach(function(done) {
    knex.seed.run()
    .then(function() {
      done();
    });
  });

  afterEach(function(done) {
    knex.seed.run()
    .then(function() {
      done();
    });
  });

  describe("GET /api/v1/meals", () => {
    it("returns all meal objects in the database", (done) => {
      chai.request(app)
      .get("/api/v1/meals")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body[0].name).to.eq("Breakfast");
        expect(res.body[1].name).to.eq("Snack");
        expect(res.body[2].name).to.eq("Lunch");
        expect(res.body[3].name).to.eq("Dinner");
        expect(res.body[3].foods).to.not.be.undefined;
        expect(res.body[3].foods[0].id).to.eq(1);
        expect(res.body[3].foods[0].name).to.eq("Ramen");
        expect(res.body[3].foods[0].calories).to.eq(650);
        done();
      })
    })
  });

  describe("GET /api/v1/meals/:id/foods", () => {
    it("returns all meal objects in the database", (done) => {
      chai.request(app)
      .get("/api/v1/meals/1/foods")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.eq("Breakfast");
        expect(res.body.foods).to.not.be.undefined;
        expect(res.body.foods[0].id).to.eq(1);
        expect(res.body.foods[0].name).to.eq("Ramen");
        expect(res.body.foods[0].calories).to.eq(650);
        expect(res.body.foods[1].id).to.eq(2);
        expect(res.body.foods[1].name).to.eq("Coffee");
        expect(res.body.foods[1].calories).to.eq(50);
        done();
      })
    })

    it("returns 404 for nonexistent meal", (done) => {
      chai.request(app)
      .get("/api/v1/meals/5/foods")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })
  });
});


describe('Meal endpoints', function() {
  beforeEach(function(done) {
    knex.seed.run()
    .then(function() {
      done();
    });
  });

  afterEach(function(done) {
    knex.seed.run()
    .then(function() {
      done();
    });
  });

  describe("POST /api/v1/meals/:meal_id/foods/:food_id", () => {
    it("creates new record in joins table and returns a message", (done) => {
      chai.request(app)
      .post("/api/v1/meals/1/foods/3")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.eq("Successfully added Shumai to Breakfast");
        done();
      })
    })

    it("returns 404 for nonexistent meal", (done) => {
      chai.request(app)
      .post("/api/v1/meals/5/foods/3")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })

    it("returns 404 for nonexistent food", (done) => {
      chai.request(app)
      .post("/api/v1/meals/1/foods/5")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })
  });

  describe("DELETE /api/v1/meals/:meal_id/foods/:food_id", () => {
    it("deletes record in joins table and returns a message", (done) => {
      chai.request(app)
      .delete("/api/v1/meals/1/foods/2")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.eq("Successfully removed Coffee from Breakfast");
        done();
      })
    })

    it("returns 404 for nonexistent meal", (done) => {
      chai.request(app)
      .delete("/api/v1/meals/5/foods/3")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })

    it("returns 404 for nonexistent food", (done) => {
      chai.request(app)
      .delete("/api/v1/meals/1/foods/5")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })
  });
});
