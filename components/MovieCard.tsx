import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import FavButton from "./FavButton";

interface MovieCardProps {
  movie: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/details?movieId=${movie.id}`)}
    >
      {/* LEFT — Poster */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />

      {/* RIGHT — Title + Description */}
      <View style={styles.right}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <FavButton movie={movie} size={24} />
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {movie.overview || "No description available."}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  poster: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },

  right: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },

  description: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
  },
});

export default MovieCard;
