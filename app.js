const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const books = require("./routes/books");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongoose-playground");

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

module.exports = app;
