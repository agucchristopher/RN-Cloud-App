import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../provider/AuthProvider";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
// Makes sure the user is authenticated before accessing protected pages

const InitialLayout = () => {
  const { session, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  let [loaded] = useFonts({
    Pbold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (!initialized) return;

    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === "(auth)";

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace("/list");
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace("/");
    }
  }, [session, initialized]);
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
  return <Slot />;
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
