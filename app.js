const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
const {setTokenInRequest} = require("./middlewares/auth")

const index = require("./routes/index");
const books = require("./routes/books");
const authorsRouter = require("./routes/authors");
const mongodb_uri = process.env.MONGODB_URI || "mongodb://localhost/express-books-api"

const mongoose = require("mongoose");
mongoose.connect(mongodb_uri);

const db = mongoose.connection;
db.on("error", error => {
  console.error("An error occurred!", error);
});

const app = express();
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/secret", setTokenInRequest, (req,res,next) => {
  jwt.verify(req.token, "some_secret", (err, data) => {
    if(err) {
      next(err);
    } else {
      res.json({message: "here's your super secret message", data})
    }
  })
})

app.use("/", index);
app.use("/books", books);
authorsRouter(app)

app.use(function(err, req,res,next) {
  if (typeof err === 'string'){
    res.status(404).json(err)
  } else {
    res.status(500).json(err.name)
  }
})
module.exports = app;
