const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, default: "~"},
  page: {type: Number, required: true, min: 0},
  rating: Number,
  number: {type: Number, default: 1},
  img: String
})

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
