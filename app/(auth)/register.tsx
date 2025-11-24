import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Register() {
  const router = useRouter();
  const btnColor = useThemeColor({}, "primaryVariant");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create Account</Text>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          // show success for any entered values and redirect to login
          Alert.alert("Success", "Account created", [
            { text: "OK", onPress: () => router.replace("/login") },
          ]);
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
              secureTextEntry
              onChangeText={handleChange("password")}
              value={values.password}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button
              title="Register"
              onPress={handleSubmit as any}
              color={btnColor}
            />

            <View style={{ height: 10 }} />
            <Button
              title="Go to Login"
              onPress={() => router.push("/login")}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
