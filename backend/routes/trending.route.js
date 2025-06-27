const express = require("express");
const listRouter = express.Router();
const trending = require("../controllers/searchedList");
const trendingMovies = require("../controllers/TrendingMovies");

listRouter.post("/list", trending);
listRouter.get("/movies", trendingMovies);

module.exports = listRouter;