import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { SyntheticEvent, useState } from "react";

type SearchInputProps = {
  title: string;
  value: string;
  handleChangeText: (e: any) => void;
  otherStyles: string;
  keyBoardType: string;
  placeholder: string;
};

const SearchInput = (searchInputProps: SearchInputProps) => {
  const {
    title,
    value,
    handleChangeText,
    otherStyles,
    keyBoardType,
    placeholder,
  } = searchInputProps;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl w-full h-16 px-4 focus:border-[#c7c4c1] items-center flex-row space-x-4">
        <TextInput
          className="flex-1 text-[#262322] font-lRegular text-base mt-0.5"
          value={value}
          placeholder="Filter profiles by zip code"
          placeholderTextColor="#a7a29d"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
        ></TextInput>
        <TouchableOpacity>
          <Image
            source={require("../assets/icons/filter.png")}
            resizeMode="contain"
            className="w-5 h-5"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchInput;
