import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "./context/AuthContext";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
    "Lato-BlackItalic": require("../assets/fonts/Lato-BlackItalic.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Lato-BoldItalic": require("../assets/fonts/Lato-BoldItalic.ttf"),
    "Lato-Italic": require("../assets/fonts/Lato-Italic.ttf"),
    "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
    "Lato-LightItalic": require("../assets/fonts/Lato-LightItalic.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Thin": require("../assets/fonts/Lato-Thin.ttf"),
    "Lato-ThinItalic": require("../assets/fonts/Lato-ThinItalic.ttf"),
  });

  type Props = any;

  const toastConfig = {
    linkToast: ({ props }: ToastConfigParams<Props>) => (
      <View className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl h-16 px-4 flex-row items-center w-[95vw] mt-4">
        <Image
          source={require("../assets/icons/link.png")}
          resizeMode="contain"
          className="w-6 h-7"
        />
        <Text className="font-lRegular text-[#262322] text-lg ml-4">
          {props.text}
        </Text>
      </View>
    ),
    declinedLinkToast: ({ props }: ToastConfigParams<Props>) => (
      <View className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl h-16 px-4 flex-row items-center w-[95vw] mt-4">
        <Image
          source={require("../assets/icons/broken-link.png")}
          resizeMode="contain"
          className="w-6 h-7"
        />
        <Text className="font-lRegular text-[#262322] text-lg ml-4">
          {props.text}
        </Text>
      </View>
    ),
    errorToast: ({ props }: ToastConfigParams<Props>) => (
      <View className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl h-16 px-4 flex-row items-center w-[95vw] mt-4">
        <Image
          source={require("../assets/icons/warning.png")}
          resizeMode="contain"
          className="w-6 h-7"
        />
        <Text className="font-lRegular text-[#262322] text-lg ml-4">
          {props.text}
        </Text>
      </View>
    ),
  };

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
          </Stack>

          <Toast config={toastConfig} />
        </AuthProvider>
      </SafeAreaProvider>
    </>
  );
};

export default RootLayout;
