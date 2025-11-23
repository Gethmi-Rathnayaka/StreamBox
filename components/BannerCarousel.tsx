import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function BannerCarousel({ movies }) {
  const router = useRouter();

  return (
    <Carousel
      width={width}
      height={300}
      autoPlay
      autoPlayInterval={3500}
      loop
      data={movies.slice(0, 8)}
      scrollAnimationDuration={1200}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push(`/details?movieId=${item.id}`)}
        >
          <ImageBackground
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.image}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 300,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
