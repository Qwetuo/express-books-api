const mongoose = require('mongoose')

    //Schema
    const bookSchema = mongoose.Schema({
        id: {type: Number, required: true, unique: true},
        title: {type: String, required: true},
        author: {type: String, required: true}
    })
    //Model
    const Book = mongoose.model("Book", bookSchema)

    //export
    module.exports = Book
