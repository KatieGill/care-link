import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { SyntheticEvent, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [form, setForm] = useState({
    user: { email: "", password: "" },
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPasswordMatchError, setShowPasswordMatchError] = useState(false);
  const { onSignUp } = useAuth();

  const passwordsMatch = form.user.password === confirmPassword;
  const shouldShowPasswordMatchError =
    !passwordsMatch && showPasswordMatchError;

  const submit = () => {
    if (!passwordsMatch) {
      setShowPasswordMatchError(true);
    } else {
      onSignUp(form).catch((err) => setErrorMessage(err.message));
    }
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
            Sign up for Care Link
          </Text>
          <FormField
            title="Email"
            value={form.user.email}
            handleChangeText={(text) => {
              setForm({ user: { ...form.user, email: text } });
            }}
            otherStyles="mt-7"
            keyBoardType="email-address"
            placeholder=""
          />
          <FormField
            title="Password"
            value={form.user.password}
            handleChangeText={(text) => {
              setForm({ user: { ...form.user, password: text } });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <FormField
            title="Confirm Password"
            value={confirmPassword}
            handleChangeText={(text) => {
              setConfirmPassword(text);
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <Text className="text-[#bd0a0a] text-base mt-4">{errorMessage}</Text>
          <Text
            style={
              shouldShowPasswordMatchError
                ? { display: "flex" }
                : { display: "none" }
            }
            className="text-[#bd0a0a] text-base mt-4"
          >
            Passwords do not match
          </Text>
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            isLoading={isLoading}
            containerStyles="mt-7"
            textStyles=""
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-[#262322] font-lRegular">
              Already have an account?
            </Text>
            <Link href="sign-in" className="text-lg font-lBold text-[#78716c]">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
