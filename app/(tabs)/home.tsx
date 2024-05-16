import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { onLogout, authState, profileTypeIsSelected, userProfileIsComplete } =
    useAuth();
  const { user } = authState;

  if (!profileTypeIsSelected) {
    router.push("/profile-type");
  } else if (!userProfileIsComplete) {
    router.push("/complete-profile");
  }
  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4">
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            className="w-[230px] h-[70px]"
          />
          <CustomButton
            title="Logout"
            handlePress={onLogout}
            containerStyles=""
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
