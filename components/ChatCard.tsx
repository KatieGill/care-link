import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { User } from "../types/types";
import { router } from "expo-router";

const ChatCard = ({ user }: { user: User }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "open-chat", params: { ...user } })
      }
    >
      <View className="px-6 mx-4 my-4 rounded-2xl flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="my-2 mr-2">
            <Image
              source={{
                uri: `http://localhost:3001/${user.image_url}`,
              }}
              style={{ width: 50, height: 50, margin: "auto" }}
              className="rounded-full"
            />
          </View>

          <View className="m-2">
            <Text className="text-[#262322] text-xl font-lBold">
              {user.username}
            </Text>
          </View>
        </View>

        <View>
          <Image
            source={require("../assets/icons/send.png")}
            resizeMode="contain"
            className="w-9 h-10"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
