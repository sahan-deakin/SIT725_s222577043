const expect = require("chai").expect;
const request = require("request");

describe("Books API Tests", function () {

  const baseUrl = "http://localhost:3000";

  it("should return a book by valid ID", function (done) {
    request.get(`${baseUrl}/api/books/b1`, function (error, response, body) {

      if (error) return done(error);

      expect(response.statusCode).to.equal(200);

      const data = JSON.parse(body);
      expect(data.data.id).to.equal("b1");

      done();
    });
  });

  it("should return 404 for invalid ID", function (done) {
    request.get(`${baseUrl}/api/books/invalid`, function (error, response, body) {

      if (error) return done(error);

      expect(response.statusCode).to.equal(404);

      done();
    });
  });

  it("should handle empty route safely", function (done) {
    request.get(`${baseUrl}/api/books/''`, function (error, response, body) {

      if (error) return done(error);

      expect(response.statusCode).to.equal(404);

      done();
    });
  });

});