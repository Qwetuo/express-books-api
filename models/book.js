const mongoose = require("mongoose");
const Author = require("./author")

//Schema
const bookSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
    //try validate by name
    // validate: {
    //   validator(author) {
    //     console.log("validator WORKING")
    //     return Author.findById(author)
    //     // return Author.findOne({ name: authorName }, null)
    //   }
    // }
  }
});

// bookSchema.path('author').validate(function(authorId, done) {
//   var self = this;
//   if(Author.findById(authorId)){
//     return done(true);
//   } else {
//     mongoose.models['Book'].count({name: authorId}, function(err, count){
//       if(err){
//         return done(err);
//       }
//       return done(!count)
//     })
//   }
// }, "error messagE?")

//Model
const Book = mongoose.model("Book", bookSchema);

//export
module.exports = Book;
