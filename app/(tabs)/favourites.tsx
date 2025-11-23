import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard";
import { RootState } from "../../store/store";

export default function Favourites() {
  const favourites = useSelector((state: RootState) => state.movies.favourites);
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  if (!token) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>
          Log in to view favourites
        </Text>
        <Button
          title="Log in"
          onPress={() => router.push("/login")}
          color={useThemeColor({}, "primaryVariant")}
        />
      </View>
    );
  }

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
