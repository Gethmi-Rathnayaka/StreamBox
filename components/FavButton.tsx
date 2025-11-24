import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/movieSlice";
import { RootState } from "../store/store";

interface FavButtonProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
  };
  size?: number;
}

const FavButton: React.FC<FavButtonProps> = ({ movie, size = 28 }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.movies.favourites);

  const isFav = favourites.some((m) => m.id === movie.id);

  const toggleFavourite = () => {
    if (isFav) {
      dispatch(removeFavourite(movie.id));
    } else {
      dispatch(addFavourite(movie));
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavourite}>
      <MaterialIcons
        name={isFav ? "favorite" : "favorite-border"}
        size={size}
        color={isFav ? "red" : "gray"}
      />
    </TouchableOpacity>
  );
};

export default FavButton;
