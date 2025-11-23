import axios from "axios";
import Constants from "expo-constants";

const extra =
  (Constants.expoConfig as { extra?: Record<string, string> } | null)?.extra ??
  ((Constants.manifest as any)?.extra as Record<string, string> | undefined);

// read the key exposed from app.config.js (this project uses `tmdbKey`)
const TMDB_API_KEY =
  extra?.tmdbKey || extra?.TMDB_API_KEY || process.env.EXPO_PUBLIC_TMDB_KEY;

if (!TMDB_API_KEY) {
  throw new Error(
    "Missing TMDB API key. Set it via app.config.js extra (tmdbKey) or set the environment variable EXPO_PUBLIC_TMDB_KEY before starting Expo."
  );
}

const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

// Get trending movies (weekly)
export const getTrendingMovies = async (): Promise<Movie[]> => {
  const res = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
  );
  return res.data.results;
};

// Optional: get movie details by id
export const getMovieDetails = async (id: number): Promise<Movie> => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
  );
  return res.data;
};
