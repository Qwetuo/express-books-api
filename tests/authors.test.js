const request = require("supertest");
const express = require("express");
const authorsRouter = require("../routes/authors");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const mongoose = require("mongoose");
const Author = require("../models/author");
const Book = require("../models/book");

const app = express();
authorsRouter(app);

let savedAuthor1;
let savedAuthor2;

async function addFakeAuthors() {
  const author1 = new Author({
    name: "paulo",
    age: 49
  });

  savedAuthor1 = await author1.save();

  const author2 = new Author({
    name: "john",
    age: 50
  });

  savedAuthor2 = await author2.save();
}

async function addBooks() {
  const book1 = new Book({
    id: 1,
    title: "book1",
    author: savedAuthor1._id
  });

  await book1.save();

  const book2 = new Book({
    id: 2,
    title: "book2",
    author: savedAuthor1._id
  });

  await book2.save();
}

beforeAll(async () => {
  jest.setTimeout(120000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);

  //   await addFakeAuthors();
  //   await addBooks();
});

beforeEach(async () => {
  mongoose.connection.db.dropDatabase();
  await addFakeAuthors();
  await addBooks();
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

test("GET /authors should return array of all authors", async () => {
  const response = await request(app).get("/authors");
  expect(response.status).toEqual(200);
  //   expect(response.body).toEqual("wait");
  // expect(Array.isArray(response.body)).toEqual(true);
  expect(response.body.length).toBe(2);
});

test("POST /authors should add a new author", async () => {
  const newAuthor = {
    name: "author 1000",
    age: 1000
  };
  const response = await request(app)
    .post("/authors")
    .send(newAuthor);
  expect(response.status).toEqual(201);
  const authors = await Author.find();
  expect(authors.length).toBe(3);
});

test("GET /authors/:name should show a record of the author", async () => {
  const response = await request(app).get("/authors/paulo");
  expect(response.status).toEqual(200);
  expect(response.body.name).toEqual("paulo");
  expect(response.body.books.length).toEqual(2);
  expect(response.body.books[0].author.name).toEqual(`paulo`);
});

test("PUT /authors/:name should update the author's information", async () => {
  const query = "paulo";
  const testData = {
    age: 100
  };
  const response = await request(app)
    .put(`/authors/${query}`)
    .send(testData);
  expect(response.status).toEqual(200);
  const authorQueried = await Author.findOne({ name: query });
  expect(authorQueried.name).toEqual(query);
  expect(authorQueried.age).toEqual(100);
});

test("DELETE /authors/:name should delete the author", async () => {
  const query = "paulo";
  const response = await request(app).delete(`/authors/${query}`)
  expect(response.status).toEqual(200);
  const authors = await Author.find();
  expect(authors.length).toBe(1);
});
