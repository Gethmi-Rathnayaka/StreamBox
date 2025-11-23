import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface HorizontalMovieCardProps {
  movie: any;
}

const HorizontalMovieCard: React.FC<HorizontalMovieCardProps> = ({ movie }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/details?movieId=${movie.id}`)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {movie.overview || "No description available."}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 250,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    color: "#555",
  },
});

export default HorizontalMovieCard;
