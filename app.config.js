require('dotenv').config(); // loads .env into process.env
export default {
  extra: {
    tmdbKey: process.env.EXPO_PUBLIC_TMDB_KEY,
    tmdbToken: process.env.EXPO_PUBLIC_TMDB_TOKEN,
  },
};