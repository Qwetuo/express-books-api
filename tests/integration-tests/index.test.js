const app = require("../../app");
const request = require("supertest");

describe("routes/index", function() {
  it("/ should return status of 200 and a response body of { message: express-blog-api }", function(done) {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ message: "hello express-blog-api" }, done);
  });

  it("you can also use promises", function() {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(function(response) {
        // then you can jest's assertions which we're familiar with
        expect(response.body).toEqual({ message: "hello express-blog-api" });

        // another way of writing the same thing
        expect(response.body.message).toEqual("hello express-blog-api");
      });
  });
});