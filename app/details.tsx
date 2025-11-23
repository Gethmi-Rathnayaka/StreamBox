import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import FavButton from "../components/FavButton";
import { getTrendingMovies } from "../utils/tmdb";

export default function Details() {
  const { movieId } = useLocalSearchParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const movies = await getTrendingMovies();
      const m = movies.find((m) => m.id === Number(movieId));
      setMovie(m);
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{ width: "100%", height: 400, borderRadius: 8 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>{movie.title}</Text>
        <FavButton movie={movie} size={32} />
      </View>
      <Text>{movie.overview}</Text>
    </ScrollView>
  );
}
