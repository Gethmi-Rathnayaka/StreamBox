import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { RootState } from "../../store/store";
import { removeAuth } from "../../utils/storage";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await removeAuth();
    } catch (e) {
      console.error("Failed to remove auth on logout", e);
    }
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Hello, {user?.username}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
