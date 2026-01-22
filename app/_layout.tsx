import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { RoomProvider } from "@/context/RoomContext";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Add custom fonts here if needed
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RoomProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="style-change" />
              <Stack.Screen name="object-remove" />
              <Stack.Screen name="color-change" />
              <Stack.Screen name="garden-redesign" />
              <Stack.Screen name="exterior-redesign" />
              <Stack.Screen name="furniture-replace" />
              <Stack.Screen name="fill-spaces" />
              <Stack.Screen name="wall-refresh" />
              <Stack.Screen name="floor-replace" />
              <Stack.Screen name="loading" />
              <Stack.Screen name="result" />
              <Stack.Screen name="paywall" options={{ presentation: "modal" }} />
            </Stack>
            <StatusBar style="dark" />
            <Toast />
          </RoomProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
