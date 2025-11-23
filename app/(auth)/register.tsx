import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
});

export default function Register() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          router.replace("/login");
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
            <Button title="Register" onPress={handleSubmit as any} />
            <Button title="Go to Login" onPress={() => router.push("/login")} />
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
