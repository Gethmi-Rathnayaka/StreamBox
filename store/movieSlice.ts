import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { saveFavourites, loadFavourites } from "../utils/storage";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieState {
  list: Movie[];
  favourites: Movie[];
}

const initialState: MovieState = {
  list: [],
  favourites: [],
};

// Load favourites from AsyncStorage
export const loadFavouritesFromStorage = createAsyncThunk(
  "movies/loadFavourites",
  async () => {
    const favs = await loadFavourites();
    return favs;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.list = action.payload;
    },
    addFavourite: (state, action: PayloadAction<Movie>) => {
      if (!state.favourites.find((m) => m.id === action.payload.id)) {
        state.favourites.push(action.payload);
        saveFavourites(state.favourites);
      }
    },
    removeFavourite: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.filter(
        (m) => m.id !== action.payload
      );
      saveFavourites(state.favourites);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFavouritesFromStorage.fulfilled, (state, action) => {
      state.favourites = action.payload || [];
    });
  },
});

export const { setMovies, addFavourite, removeFavourite } = movieSlice.actions;
export default movieSlice.reducer;
