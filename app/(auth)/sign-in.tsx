import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { SyntheticEvent, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { ComposedGesture, GestureDetector } from "react-native-gesture-handler";

const SignIn = () => {
  const [form, setForm] = useState({ user: { email: "", password: "" } });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { onLogin, authState, userProfileIsComplete, profileTypeIsSelected } =
    useAuth();

  const resetForm = () => {
    setForm({ user: { email: "", password: "" } });
  };

  const submit = async () => {
    return await onLogin(form)
      .then(() => resetForm())
      .then(() => {
        if (profileTypeIsSelected === false) {
          console.log("profileType is not selected", profileTypeIsSelected);
          router.push("/profile-type");
        } else if (userProfileIsComplete === false) {
          console.log("user profile is not complete");
          router.push("/complete-profile");
        } else {
          router.push("/home");
        }
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4">
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            className="w-[230px] h-[70px]"
          />
          <Text className="text-[#262322] font-lRegular my-4 text-xl">
            Log in to Care Link
          </Text>

          <FormField
            title="Email"
            value={form.user.email}
            handleChangeText={(text) => {
              setForm({
                user: { email: text, password: form.user.password },
              });
            }}
            otherStyles="mt-7"
            keyBoardType="email-address"
            placeholder=""
          />
          <FormField
            title="Password"
            value={form.user.password}
            handleChangeText={(text) => {
              setForm({
                user: { email: form.user.email, password: text },
              });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <Text className="text-[#bd0a0a] text-base mt-4">{errorMessage}</Text>
          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isLoading}
            containerStyles="px-4"
            textStyles=""
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-[#262322] font-lRegular">
              Don't have an account?
            </Text>
            <Link href="sign-up" className="text-lg font-lBold text-[#78716c]">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
