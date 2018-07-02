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
        expect(res.body[1].name).to.eq("Lunch");
        expect(res.body[2].name).to.eq("Snack");
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
        expect(res.body[0].name).to.eq("Breakfast");
        expect(res.body[0].foods).to.not.be.undefined;
        expect(res.body[0].foods[0].id).to.eq(1);
        expect(res.body[0].foods[0].name).to.eq("Ramen");
        expect(res.body[0].foods[0].calories).to.eq(650);
        expect(res.body[0].foods[1].id).to.eq(2);
        expect(res.body[0].foods[1].name).to.eq("Coffee");
        expect(res.body[0].foods[1].calories).to.eq(50);
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


//   describe("GET /api/v1/foods", () => {
//     it('returns all foods in the database', (done) => {
//       chai.request(app)
//       .get('/api/v1/foods')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body.length).to.eql(3);
//         expect(res.body[0].name).to.eq("Ramen");
//         expect(res.body[0].calories).to.eq(650);
//         expect(res.body[1].name).to.eq("Coffee");
//         expect(res.body[1].calories).to.eq(50);
//         expect(res.body[2].name).to.eq("Shumai");
//         expect(res.body[2].calories).to.eq(400);
//         done();
//       })
//     })
//   })
//
//   describe("GET /api/v1/foods/:id", () => {
//     it('returns food corresponding to :id', (done) => {
//       chai.request(app)
//       .get('/api/v1/foods/1')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body.length).to.eql(1);
//         expect(res.body[0].name).to.eq("Ramen");
//         expect(res.body[0].calories).to.eq(650);
//         done();
//       })
//     })
//
//     it('returns 404 for nonexisting record', (done) => {
//       chai.request(app)
//       .get('/api/v1/foods/99')
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       })
//     })
//   })
//
//   describe("POST /api/v1/foods", () => {
//     it('creates a new food object in the database', (done) => {
//       chai.request(app)
//       .post('/api/v1/foods')
//       .send({ "food": { "name": "orange", "calories": 900} })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body.name).to.eq("orange");
//         expect(res.body.calories).to.eq(900);
//         // expect(knex('foods').count('*')
//         //     .then(foods => {
//         //       console.log(foods[0]["count"]);
//         //       return foods[0]["count"]
//         //     })).to.eq('4');
//         done();
//       })
//     })
//
//     it('fails to create record if name missing', (done) => {
//       chai.request(app)
//       .post('/api/v1/foods')
//       .send({ "food": { "calories": 900} })
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       })
//     })
//
//     it('fails to create record if calories missing', (done) => {
//       chai.request(app)
//       .post('/api/v1/foods')
//       .send({ "food": { "name": "orange"} })
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       })
//     })
//   })
//
//   describe("PATCH /api/v1/foods/:id", () => {
//     it('updates food object corresponding to :id', (done) => {
//       chai.request(app)
//       .patch('/api/v1/foods/1')
//       .send({ "food": { "name": "orange", "calories": 900} })
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body.name).to.eq("orange");
//         expect(res.body.calories).to.eq(900);
//         done();
//       })
//     })
//
//     it('returns a 404 if name is missing', (done) => {
//       chai.request(app)
//       .patch('/api/v1/foods/1')
//       .send({ "food": {  "calories": 900} })
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       })
//     })
//
//     it('returns a 404 if calories is missing', (done) => {
//       chai.request(app)
//       .patch('/api/v1/foods/1')
//       .send({ "food": {  "name": "orange"} })
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       })
//     })
//
//     it('returns a 404 if record does not exist', (done) => {
//       chai.request(app)
//       .patch('/api/v1/foods/99')
//       .send({ "food": {  "name": "orange", "calories": 100 } })
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       })
//     })
//   })
//
//   describe("DELETE /api/v1/foods/:id", () => {
//     it('deletes food object corresponding to :id', (done) => {
//       chai.request(app)
//       .delete('/api/v1/foods/1')
//       .end((err, res) => {
//         expect(res).to.have.status(204);
//         done();
//       })
//     })
//
//     it('returns a 404 when trying to delete nonexisting record', (done) => {
//       chai.request(app)
//       .delete('/api/v1/foods/1')
//       .end((err, res) => {
//         expect(res).to.have.status(204);
//         done();
//       })
//     })
//   })
// });
