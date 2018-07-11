const mongoose = require("mongoose");

//Schema
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: { type: Number }
});
//Model
const Author = mongoose.model("Author", authorSchema);

//export
module.exports = Author;
