import axios from "axios";

const API_KEY = "YOUR_TMDB_KEY"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

// Get trending movies (weekly)
export const getTrendingMovies = async (): Promise<Movie[]> => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return res.data.results;
};

// Optional: get movie details by id
export const getMovieDetails = async (id: number): Promise<Movie> => {
  const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.data;
};
