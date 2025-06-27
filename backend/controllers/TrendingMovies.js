const searchedList = require("../models/SearchedList");

const trendingMovies = async (req, res) => {
  try {
    const topFive = await searchedList.find().sort({ count: -1 }).limit(5);
    
    res.status(200).json({ movies: topFive });
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

module.exports = trendingMovies;
