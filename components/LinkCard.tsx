import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { User } from "../types/types";
import { router } from "expo-router";

const LinkCard = ({ user }: { user: User }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "link-profile", params: { ...user } })
      }
    >
      <View className="px-6 mx-4 my-4  bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl flex-row justify-start items-center">
        <View className="my-2 mr-2">
          <Image
            source={{
              uri: `http://localhost:3001/${user.image_url}`,
            }}
            style={{ width: 100, height: 100, margin: "auto" }}
            className="rounded-full"
          />
        </View>

        <View className="m-2">
          <Text className="text-[#262322] text-2xl font-lBold">
            {user.username}
          </Text>
          <Text className="text-[#78716c] font-lRegular text-sm">
            {user.first_name}
          </Text>
          <Text className="text-[#78716c] font-lRegular text-sm">
            {user.last_name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LinkCard;
