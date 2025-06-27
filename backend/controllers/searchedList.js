const searchedList = require("../models/SearchedList");

const trending = async (req, res) => {
  const { movieID, movieTitle, posterURL } = req.body;
  try {
    // Check if the movie has already been searched
    const existingMovie = await searchedList.findOne({ movie_id: movieID });
    if (existingMovie) {
        // Increment the count
      existingMovie.count = existingMovie.count + 1;
      await existingMovie.save();
    } else {
        // Create new entry
      const newMovie = new searchedList({
        movie_id: movieID,
        title: movieTitle,
        poster_url: posterURL,
      });
      await newMovie.save();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = trending;
