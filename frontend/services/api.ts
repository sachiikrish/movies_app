import axios from "axios";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`,
      {
        headers: TMDB_CONFIG.headers,
      }
    );
    const data = response.data.results;
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const fetchMovieDetails = async (movie_id: string) => {
  try {
    const response = await axios.get(
      `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        headers: TMDB_CONFIG.headers,
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
