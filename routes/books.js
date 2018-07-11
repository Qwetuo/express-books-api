const express = require("express");
const router = express.Router();
const Book = require("../models/book");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().populate("author");
    res.json(books);
  } catch (e) {
    next(e)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const bookWithId = await Book.findOne({ id: req.params.id }, null);
    res.json(bookWithId);
  } catch (e) {
    next(e)
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book({
      id: req.body.id,
      title: req.body.title,
      author: req.body.author
    });
    await newBook.save();
    res
      .status(201)
      .json({ message: `new book with title ${req.body.title} created` });
  } catch (e) {
    next(e)
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const query = { id: req.params.id };
    await Book.findOneAndUpdate(query, req.body);
    res.json({ message: `update book with id ${req.params.id}` });
  } catch (e) {
    next(e)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Book.findOneAndRemove({ id: req.params.id });
    res.json({ message: `delete book with id ${req.params.id}` });
  } catch (e) {
    next(e)
  }
});

module.exports = router;
