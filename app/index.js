import {
  Alert,
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { supabase } from "../config/initSupabase";
import { useFonts } from "expo-font";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let [loaded] = useFonts({
    Pbold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!loaded) {
    return (
      <View
        style={{
          backgroundColor: "#121212",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={"white"} size={"large"} />
      </View>
    );
  }
  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  // Create a new user
  const onSignUpPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <Text style={styles.header}>My Cloud</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="john@doe.com"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={{ color: "#fff" }}>Sign in</Text>
      </TouchableOpacity>
      <Button
        onPress={onSignUpPress}
        title="Create Account"
        color={"#fff"}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
    backgroundColor: "#151515",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    margin: 50,
    color: "#fff",
    fontFamily: "PBold",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#2b825b",
    borderRadius: 4,
    padding: 10,
    color: "#fff",
    backgroundColor: "#363636",
  },
  button: {
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: "#2b825b",
    padding: 12,
    borderRadius: 4,
  },
});

export default Login;
