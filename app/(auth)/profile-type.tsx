import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Role } from "../../types/types";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Requests } from "../api";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

const ProfileType = () => {
  const [profileType, setProfileType] = useState<Role>("care_seeker");
  const { updateCurrentUserData } = useAuth();

  const submit = () => {
    updateCurrentUserData({ role: profileType }).then(() =>
      router.push("/complete-profile")
    );
  };
  const selected = "border-4 border-[#a7a29d]";

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4">
          <Text className="text-[#262322] font-lRegular my-4 text-xl">
            Select a profile type to continue:
          </Text>
          <CustomButton
            title="I am seeking childcare"
            handlePress={() => setProfileType("care_seeker")}
            containerStyles={`mt-7 ${
              profileType === "care_seeker" ? selected : ""
            }`}
            textStyles=""
            isLoading={false}
          ></CustomButton>
          <CustomButton
            title="I am a childcare provider"
            handlePress={() => setProfileType("care_provider")}
            containerStyles={`mt-7 ${
              profileType === "care_provider" ? selected : ""
            }`}
            textStyles=""
            isLoading={false}
          ></CustomButton>
          <CustomButton
            title="Submit"
            handlePress={submit}
            containerStyles="mt-12"
            textStyles=""
            isLoading={false}
          ></CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileType;
