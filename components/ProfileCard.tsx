import { View, Text, Image } from "react-native";
import React from "react";
import { User } from "../types/types";

const ProfileCard = ({
  user,
  isLinkProfile,
}: {
  user: User | null;
  isLinkProfile: boolean;
}) => {
  return (
    <View className="px-6 mb-2 bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl">
      <Text className="text-[#262322] text-xl font-lBold text-center mt-2">
        Profile Details
      </Text>
      <View className="flex-row items-center my-2">
        <View className="rounded-full bg-[#c7c4c1] w-10 h-10">
          <Image
            source={require("../assets/icons/username.png")}
            resizeMode="contain"
            className="w-8 h-9"
            style={{ margin: "auto" }}
          />
        </View>
        <Text className="text-[#262322] font-lRegular text-lg ml-3">
          {user?.username}
        </Text>
      </View>
      {isLinkProfile ? (
        ""
      ) : (
        <View className="flex-row items-center my-2">
          <View className="rounded-full bg-[#c7c4c1] w-10 h-10">
            <Image
              source={require("../assets/icons/arroba.png")}
              resizeMode="contain"
              className="w-8 h-9"
              style={{ margin: "auto" }}
            />
          </View>
          <Text className="text-[#262322] font-lRegular text-lg ml-3">
            {user?.email}
          </Text>
        </View>
      )}

      <View className="flex-row items-center my-2">
        <View className="rounded-full bg-[#c7c4c1] w-10 h-10">
          <Image
            source={require("../assets/icons/kids.png")}
            resizeMode="contain"
            className="w-8 h-9"
            style={{ margin: "auto" }}
          />
        </View>
        <Text className="text-[#262322] font-lRegular text-lg ml-3">
          {user?.role === "care_seeker"
            ? `${user?.number_of_children} children`
            : `${user?.years_experience} years of experience`}
        </Text>
      </View>
      <View className="flex-row items-center my-2">
        <View className="rounded-full bg-[#c7c4c1] w-10 h-10">
          <Image
            source={require("../assets/icons/dollar.png")}
            resizeMode="contain"
            className="w-8 h-9"
            style={{ margin: "auto" }}
          />
        </View>
        <Text className="text-[#262322] font-lRegular text-lg ml-3">
          {`$${user?.pay}/hr`}{" "}
          {user?.role === "care_seeker" ? "pay rate" : "base rate"}
        </Text>
      </View>
      <View className="flex-row items-center my-2">
        <View className="rounded-full bg-[#c7c4c1] w-10 h-10">
          <Image
            source={require("../assets/icons/location-pin.png")}
            resizeMode="contain"
            className="w-8 h-9"
            style={{ margin: "auto" }}
          />
        </View>
        <Text className="text-[#262322] font-lRegular text-lg ml-3">
          {user?.zip_code}
        </Text>
      </View>
    </View>
  );
};

export default ProfileCard;
