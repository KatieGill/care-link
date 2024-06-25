import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Requests } from "../api";
import { User } from "../../types/types";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import ImagePickerScreen from "../../components/ImagePicker";
import UserCard from "../../components/UserCard";
import * as SecureStore from "expo-secure-store";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Home = () => {
  const { onLogout, authState, profileTypeIsSelected, userProfileIsComplete } =
    useAuth();
  const { user } = authState;
  const [userProfiles, setUserProfiles] = useState<User[]>([]);

  const profileRole =
    user?.role === "care_provider" ? "care_seeker" : "care_provider";

  useEffect(() => {
    if (profileTypeIsSelected === false) {
      router.push("/profile-type");
    } else if (userProfileIsComplete === false) {
      router.push("/complete-profile");
    }
    const getUserProfiles = async () => {
      const token = await SecureStore.getItemAsync("JWT");
      if (token) {
        return await Requests.getUsers(token, "role", profileRole).then(
          (users) => setUserProfiles(users)
        );
      }
    };
    getUserProfiles();
  }, [userProfileIsComplete, profileTypeIsSelected]);
  const pan = Gesture.Pan();
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <SafeAreaView className="bg-[#f4f3f2] h-full">
          <FlatList
            data={userProfiles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <UserCard
                profileRole={profileRole}
                setUserProfiles={setUserProfiles}
                user={item}
              />
            )}
            ListHeaderComponent={() => (
              <View className="my-6 px-4 space-y-6">
                <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="text-[#78716c] font-lRegular text-sm">
                      Welcome Back
                    </Text>
                    <Text className="text-[#262322] text-2xl font-lBold">
                      {user?.username}
                    </Text>
                  </View>
                  <View className="mt-1.5">
                    <Image
                      source={require("../../assets/icons/link.png")}
                      resizeMode="contain"
                      className="w-9 h-10"
                    />
                  </View>
                </View>
                <SearchInput />
              </View>
            )}
          />
        </SafeAreaView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
// };

export default Home;
