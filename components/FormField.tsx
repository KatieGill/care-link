import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { SyntheticEvent, useState } from "react";

type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: (e: any) => void;
  otherStyles: string;
  keyBoardType: string;
  placeholder: string;
};

const FormField = (formFieldProps: FormFieldProps) => {
  const {
    title,
    value,
    handleChangeText,
    otherStyles,
    keyBoardType,
    placeholder,
  } = formFieldProps;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View className="space-y-2">
        <Text className="text-base font-lRegular text-[#262322]">{title}</Text>
      </View>
      <View className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl w-full h-16 px-4 focus:border-[#c7c4c1] items-center flex-row">
        <TextInput
          className="flex-1 text-[#262322] font-lRegular text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#262322"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        ></TextInput>

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={
                showPassword
                  ? require("../assets/icons/view.png")
                  : require("../assets/icons/hide.png")
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default FormField;
