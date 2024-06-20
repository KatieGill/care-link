import { View, Text, Image } from "react-native";
import React from "react";

const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="items-center mt-12">
      <Image
        source={require("../assets/icons/broken-link.png")}
        resizeMode="contain"
        className="w-24 h-24"
      />
      <Text className="text-[#262322] text-2xl font-lBold mt-6">{title}</Text>
      <Text className="text-[#78716c] font-lRegular text-sm">{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
