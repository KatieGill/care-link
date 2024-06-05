import { View, Text, Image } from "react-native";
import React from "react";
import { User } from "../types/types";

const UserCard = ({ user }: { user: User }) => {
  return (
    <View className="px-6 mx-4 my-4  bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl">
      <Text className="text-[#262322] text-2xl font-lBold mt-2">
        {user?.username}
      </Text>
      <View className="justify-between items-start flex-row mb-2">
        <View>
          {user.role === "care_provider" ? (
            <Text className="text-[#78716c] font-lRegular text-sm">
              Years of experience: {user.years_experience}
            </Text>
          ) : (
            <Text className="text-[#78716c] font-lRegular text-sm">
              Number of children: {user.years_experience}
            </Text>
          )}
        </View>
        <View>
          <Text className="text-[#78716c] font-lRegular text-sm">
            ${user.pay}/hr
          </Text>
        </View>
      </View>

      <View className="flex justify-around">
        <Image
          source={{ uri: `http://localhost:3001/${user.image_url}` }}
          style={{ width: 300, height: 300, margin: "auto" }}
          className="rounded"
        />
      </View>

      <Text className="text-[#78716c] font-lRegular text-sm mb-2 mt-2">
        {user.bio}
      </Text>
    </View>
  );
};

export default UserCard;
