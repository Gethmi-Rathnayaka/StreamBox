import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View, StyleSheet } from "react-native";
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
    <ScrollView style={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{movie.title}</Text>
        <FavButton movie={movie} size={32} />
      </View>

      <View style={styles.meta}>
        <Text style={styles.metaText}>Release: {movie.release_date || "N/A"}</Text>
        <Text style={styles.metaText}>Rating: {movie.vote_average || "N/A"}</Text>
      </View>

      <Text style={styles.overview}>{movie.overview || "No description available."}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  posterContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    flex: 1,
    marginRight: 12,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metaText: {
    fontSize: 14,
    color: "#555",
  },
  overview: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
});
