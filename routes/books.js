const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/book");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  const books = await Book.find();
  res.json(books);
});

router.get("/:id", async (req, res, next) => {
  const bookWithId = await Book.findOne({ id: req.params.id }, null);
  res.json(bookWithId);
});

router.post("/", async (req, res, next) => {
  const newBook = new Book({
    id: req.body.id,
    title: req.body.title,
    author: req.body.author
  });
  await newBook.save();
  res
    .status(201)
    .json({ message: `new book with title ${req.body.title} created` });
});

router.put("/:id", async (req, res, next) => {
  const query = { id: req.params.id };
  await Book.findOneAndUpdate(query, req.body);
  // updatedBook.
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", async (req, res, next) => {
  await Book.findOneAndRemove({ id: req.params.id });
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
