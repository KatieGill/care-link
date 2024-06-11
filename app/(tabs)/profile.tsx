import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "../../components/ProfileCard";
import { router } from "expo-router";

const Profile = () => {
  const { onLogout, authState } = useAuth();
  const { user } = authState;
  console.log(authState.user?.image_url);
  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <View className="my-6 px-4 flex items-stretch">
          <View className="mb-4 justify-start flex-row">
            <View className="mr-4">
              <Image
                source={{
                  uri: `http://localhost:3001/${authState.user?.image_url}`,
                }}
                style={{ width: 150, height: 150, margin: "auto" }}
                className="rounded-full"
              />
            </View>
            <View className="flex justify-between my-4">
              <View>
                <Text className="text-[#262322] text-2xl font-lBold">
                  {user?.first_name}
                </Text>
                <Text className="text-[#78716c] font-lRegular text-lg">
                  {user?.last_name}
                </Text>
              </View>
              <View>
                <Text className="text-[#78716c] font-lRegular text-base">
                  {user?.role === "care_provider"
                    ? "Care Provider"
                    : "Care Seeker"}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[#78716c] font-lRegular text-base">
                    You have 3 Links
                  </Text>
                  <Image
                    source={require("../../assets/icons/link.png")}
                    resizeMode="contain"
                    className="w-4 h-5 ml-1"
                  />
                </View>
              </View>
            </View>
          </View>

          <ProfileCard user={user} />
          <View className="px-6 mb-2 bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl">
            <Text className="text-[#262322] text-xl font-lBold text-center mt-2">
              Bio
            </Text>
            <Text className="text-[#262322] font-lRegular text-base py-4">
              {user?.bio}
            </Text>
          </View>
          <CustomButton
            title="Edit Profile"
            handlePress={() => router.push("edit-profile")}
            containerStyles="px-4 mt-4"
            textStyles=""
            isLoading={false}
          />
          <CustomButton
            title="Logout"
            handlePress={onLogout}
            containerStyles="px-4 mt-4"
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
