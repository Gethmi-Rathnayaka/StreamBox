import AsyncStorage from "@react-native-async-storage/async-storage";

// Save favourites to AsyncStorage
export const saveFavourites = async (favourites: any[]) => {
  try {
    await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
  } catch (err) {
    console.log("Error saving favourites:", err);
  }
};

// Load favourites from AsyncStorage
export const loadFavourites = async () => {
  try {
    const data = await AsyncStorage.getItem("favourites");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log("Error loading favourites:", err);
    return [];
  }
};

// Save auth info to AsyncStorage
export const saveAuth = async (auth: any) => {
  try {
    await AsyncStorage.setItem("auth", JSON.stringify(auth));
    // debug logging removed
  } catch (err) {
    console.log("Error saving auth:", err);
  }
};

// Load auth info from AsyncStorage
export const loadAuth = async () => {
  try {
    const data = await AsyncStorage.getItem("auth");
    const parsed = data ? JSON.parse(data) : null;
    // debug logging removed
    return parsed;
  } catch (err) {
    console.log("Error loading auth:", err);
    return null;
  }
};

// Remove auth from AsyncStorage
export const removeAuth = async () => {
  try {
    await AsyncStorage.removeItem("auth");
  } catch (err) {
    console.log("Error removing auth:", err);
  }
};
