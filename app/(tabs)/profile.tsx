import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { RootState } from "../../store/store";
import {
  loadProfileDescription,
  removeAuth,
  saveProfileDescription,
} from "../../utils/storage";

export default function Profile() {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [initialDescription, setInitialDescription] = useState<string>("");
  const [editingStarted, setEditingStarted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDescription = async () => {
      const desc = await loadProfileDescription();
      setDescription(desc);
      setInitialDescription(desc);
    };
    loadDescription();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch("https://dummyjson.com/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setProfile(await res.json());
      } catch (e) {
        console.error("Error fetching profile:", e);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = async () => {
    await removeAuth().catch(() => {});
    dispatch(logout());
  };

  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Log in to view profile</Text>
        <Button title="LogIn" onPress={() => router.push("/login")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profile ? (
        <View style={styles.card}>
          <Image
            source={{ uri: profile.image }}
            style={styles.avatar}
            resizeMode="cover"
          />

          <Text style={styles.name}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.username}>@{profile.username}</Text>
          <Text style={styles.email}>{profile.email}</Text>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Add a short description..."
            value={description}
            onChangeText={setDescription}
            multiline
            onFocus={() => setEditingStarted(true)}
          />

          {editingStarted && description !== initialDescription && (
            <Button
              title={saving ? "Saving..." : "Save"}
              onPress={async () => {
                setSaving(true);
                await saveProfileDescription(description);
                setInitialDescription(description);
                setEditingStarted(false);
                setSaving(false);
              }}
            />
          )}

          <View style={{ height: 16 }} />
          <Button title="LogOut" onPress={handleLogout} />
        </View>
      ) : (
        <Text>Loading profile...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  // logo removed from profile; header shows logo instead
  card: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
  },
  avatar: { width: 130, height: 130, borderRadius: 65, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: "bold" },
  username: { color: "#666", marginBottom: 10 },
  email: { color: "#333", marginBottom: 10 },
  label: { alignSelf: "flex-start", marginBottom: 6, fontWeight: "600" },
  textarea: {
    width: "100%",
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 12 },
});
