import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setMovies, loadFavouritesFromStorage } from "../../store/movieSlice";
import { getTrendingMovies } from "../../utils/tmdb";
import MovieCard from "../../components/MovieCard";

export default function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.list);

  useEffect(() => {
    const loadData = async () => {
      dispatch(loadFavouritesFromStorage());
      const data = await getTrendingMovies();
      dispatch(setMovies(data));
    };
    loadData();
  }, []);

  if (!movies.length) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
