import React from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MovieCard from "../../components/MovieCard";

export default function Favourites() {
  const favourites = useSelector((state: RootState) => state.movies.favourites);

  if (!favourites.length)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favourites yet</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favourites}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
