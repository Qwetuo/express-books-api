const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

router.use(express.json())

router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.find().populate("Books");
    res.json(authors);
    // res.json("wait")
  } catch (e) {
    next();
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const authorWithName = await Author.findOne(
      { name: req.params.name },
      null
    );
    const authorId = authorWithName._id;
    const books = await Book.find({ author: authorId }).populate("author");
    res.json({
      ...authorWithName.toJSON(),
      books: books
    });
    console.log("res")
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAuthor = new Author({
      name: req.body.name,
      age: req.body.age,
      books: req.body.books
    });
    await newAuthor.save();
    res
      .status(201)
      .json({ message: `new author with name ${req.body.name} created` });
  } catch (e) {
    next(e);
  }
});

router.put("/:name", async (req, res, next) => {
  try {
    const query = { name: req.params.name };
    const authorWithName = await Author.findOne(query, null);
    if (authorWithName) {
      await Author.findOneAndUpdate(query, req.body);
      res.json({ message: `updated author with name ${req.params.name}` });
    } else {
      throw `author with name '${
        req.params.name
      }' not found. Please try again.`;
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:name", async (req, res, next) => {
  try {
    const authorWithName = await Author.findOne(
      { name: req.params.name },
      null
    );
    if (authorWithName) {
      await Author.findOneAndRemove({ name: req.params.name });
      res.json({ message: `deleted author with name ${req.params.name}` });
    } else {
      throw `author with name '${
        req.params.name
      }' not found. Please try again.`;
    }
  } catch (e) {
    next(e);
  }
});

module.exports = app => {
  // app.use(express.json());
  app.use("/authors", router);
};
