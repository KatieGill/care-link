import { Text, TouchableOpacity } from "react-native";
import React from "react";

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
};
const CustomButton = (customButtonProps: CustomButtonProps) => {
  const { title, handlePress, containerStyles, textStyles, isLoading } =
    customButtonProps;
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`rounded-xl min-h-[58px] justify-center items-center bg-[#78716c] ${containerStyles}`}
    >
      <Text
        className={`font-lBold text-[#262322] text-lg ${textStyles} ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
