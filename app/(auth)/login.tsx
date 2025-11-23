import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
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

  return (
    <View style={styles.container}>
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
              <Text style={{ color: "red" }}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}

            <Button
              title={loading ? "Logging in..." : "Login"}
              onPress={handleSubmit as any}
              disabled={loading}
            />
            <Button
              title="Go to Register"
              onPress={() => router.push("/register")}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
});
