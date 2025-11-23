import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BannerCarousel from "../../components/BannerCarousel";
import HorizontalMovieCard from "../../components/HorizontalMovieCard";
import MovieCard from "../../components/MovieCard";
import { loadFavouritesFromStorage, setMovies } from "../../store/movieSlice";
import { RootState } from "../../store/store";
import { getTrendingMovies } from "../../utils/tmdb";

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

  const bestOfTheWeek = useMemo(() => movies.slice(0, 10), [movies]);
  const recommended = useMemo(() => movies.slice(5, 15), [movies]);
  const continueWatching = useMemo(() => movies.slice(8, 18), [movies]);

  if (!movies.length) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <BannerCarousel movies={movies} />

      <Section title="Best of This Week" style={{ marginTop: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {bestOfTheWeek.map((movie) => (
            <HorizontalMovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollView>
      </Section>

      <Section title="Recommended For You">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {recommended.map((movie) => (
            <HorizontalMovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollView>
      </Section>

      <Section title="Continue Watching">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {continueWatching.map((movie) => (
            <HorizontalMovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollView>
      </Section>

      <Section title="Trending Now">
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </Section>
    </ScrollView>
  );
}

const Section: React.FC<{ title: any; children: any; style?: any }> = ({
  title,
  children,
  style,
}) => (
  <View style={[{ marginBottom: 20 }, style]}>
    <Text
      style={{
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
        paddingHorizontal: 10,
      }}
    >
      {title}
    </Text>
    {children}
  </View>
);
