const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const books = require("./routes/books");
const authors = require("./routes/authors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/express-books-api");

const db = mongoose.connection;
db.on("error", error => {
  console.error("An error occurred!", error);
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/books", books);
app.use("/authors", authors)

app.use(function(err, req,res,next) {
  if (typeof err === 'string'){
    res.status(404).json(err)
  } else {
    res.status(500).json(err.name)
  }
})
module.exports = app;
