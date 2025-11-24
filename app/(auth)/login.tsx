import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setAuth } from "../../store/authSlice";
import { login as loginApi } from "../../utils/auth";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const btnColor = useThemeColor({}, "primaryVariant");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const auth = await loginApi(values.username, values.password);
            dispatch(setAuth(auth));
            router.replace("/");
          } catch (err: any) {
            Alert.alert("Login failed", err.message || "Unable to login");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange("username")}
              value={values.username}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button
              title={loading ? "Logging in..." : "Login"}
              onPress={handleSubmit as any}
              disabled={loading}
              color={btnColor}
            />

            <View style={{ height: 10 }} />
            <Button
              title="Go to Register"
              onPress={() => router.push("/register")}
              color={btnColor}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  error: { color: "red", marginBottom: 8 },
});
