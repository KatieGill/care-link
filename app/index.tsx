import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { authState } = useAuth();

  if (authState.authenticated && authState.user) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={require("../assets/images/logo.png")}
            className="w-[260px] h-[100px] mb-0 mt-0"
            resizeMode="contain"
          />
          <Image
            source={require("../assets/images/index-photos.png")}
            className="max-w-[570px] w-full h-[300px] mt-0"
            resizeMode="contain"
          />
          <Text className="text-3xl text-center font-lRegular text-[#262322] mt-2">
            Creating the <Text className="text-[#78716c] font-lBold">link</Text>{" "}
            for child
            <Text className="text-[#78716c] font-lBold">care</Text>
          </Text>
          <Text className="text-sm font-lRegular text-center text-[#262322]">
            A place for childcare providers and seekers to connect
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={() => router.push("sign-in")}
            containerStyles="w-full mt-7"
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
