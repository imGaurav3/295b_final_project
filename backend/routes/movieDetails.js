const express = require('express');
const router = express.Router();
const axios = require('axios');

// Replace 'YOUR_API_KEY' with your actual TMDB API key
const API_KEY = 'de8a7853bbd000984d6455656338eb6d';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Function to fetch movie details
async function fetchMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`;
  try {
    const response = await axios.get(url);
    const movie = response.data;
    return {
      imdb_id: movie.imdb_id,
      runtime: movie.runtime,
      title: movie.title,
      genres: movie.genres.map((genre) => genre.name),
      release_date: movie.release_date,
      id: movie.id,
      poster_path: movie.poster_path
        ? `${BASE_IMAGE_URL}${movie.poster_path}`
        : null, // Append the base URL to the poster path
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch movie details');
  }
}

// Endpoint to get details for a list of movies
router.post('/movies/details', async (req, res) => {
  const movieIds = req.body.movieIds; // Expecting movie IDs in the request body

  if (!Array.isArray(movieIds) || movieIds.length === 0) {
    return res.status(400).send('Please provide a list of movie IDs');
  }

  try {
    const movieDetailsPromises = movieIds.map(fetchMovieDetails);
    const moviesDetails = await Promise.all(movieDetailsPromises);
    res.json(moviesDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error while fetching movies details');
  }
});

module.exports = router;
