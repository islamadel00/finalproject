import React from "react";
import { Stack } from "expo-router";
import { Button, View } from "react-native";
import { useRouter } from "expo-router";
import { AppProvider, useApp } from "../context/AppContext";
import Toast from "react-native-toast-message";


function LayoutWithContext() {
  const { toggleTheme } = useApp();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0A0A0A" },
        headerTintColor: "#FFD700",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },
        animation: "slide_from_right",
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginRight: 10,
            }}
          >
            <Button
              title="❤️"
              color="#FFD700"
              onPress={() => router.push("/favorites")}
            />
            <Button title="🌓" onPress={toggleTheme} color="#FFD700" />
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="favorites" options={{ title: "Favorites" }} />
      <Stack.Screen name="movie/[id]" options={{ title: "Movie Details" }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AppProvider>
      <LayoutWithContext />
      <Toast />
    </AppProvider>
  );
}
