const mongoose = require("mongoose");

const searchedListSchema = mongoose.Schema({
  movie_id: {
    type: Number,
    unique: true,
  },
  title: String,
  poster_url: String,
  count: {
    type: Number,
    default: 1,
  },
});

const searchedList = new mongoose.model("searchedMovies", searchedListSchema);
module.exports = searchedList;
