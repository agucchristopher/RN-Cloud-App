import { Stack } from "expo-router";
import { useAuth } from "../../provider/AuthProvider";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Simple stack layout within the authenticated area
const StackLayout = () => {
  const { signOut } = useAuth();
  let [loaded] = useFonts({
    Pbold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
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
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0f0f0f",
        },
        headerTitleStyle: { fontFamily: "PBold" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="list"
        options={{
          headerTitle: "My Files",
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Ionicons name="log-out-outline" size={30} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default StackLayout;
