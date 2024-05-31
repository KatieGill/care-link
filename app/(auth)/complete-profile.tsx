import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import ImagePickerScreen from "../../components/ImagePicker";

const CompleteProfile = () => {
  const { authState, updateCurrentUserData } = useAuth();
  const { user } = authState;
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    zip_code: "",
    number_of_children: "",
    years_experience: "",
    pay: "",
    bio: "",
    display_picture: "",
  });
  const submit = () => {
    updateCurrentUserData(form).then(() => router.push("/home"));
  };

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4">
          <Text className="text-[#262322] font-lRegular my-4 text-xl">
            Complete your user profile to get started
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) => {
              setForm({ ...form, username: text });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <FormField
            title="First Name"
            value={form.first_name}
            handleChangeText={(text) => {
              setForm({ ...form, first_name: text });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <FormField
            title="Last Name"
            value={form.last_name}
            handleChangeText={(text) => {
              setForm({ ...form, last_name: text });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <FormField
            title="Zip Code"
            value={form.zip_code}
            handleChangeText={(text) => {
              setForm({ ...form, zip_code: text });
            }}
            otherStyles="mt-7"
            keyBoardType="numeric"
            placeholder=""
          />
          {user?.role === "care_provider" ? (
            <FormField
              title="Years of Experience"
              value={form.years_experience}
              handleChangeText={(text) => {
                setForm({ ...form, years_experience: text });
              }}
              otherStyles="mt-7"
              keyBoardType="numeric"
              placeholder=""
            />
          ) : (
            <FormField
              title="Number of Children"
              value={form.number_of_children}
              handleChangeText={(text) => {
                setForm({ ...form, number_of_children: text });
              }}
              otherStyles="mt-7"
              keyBoardType="numeric"
              placeholder=""
            />
          )}
          <FormField
            title={user?.role === "care_provider" ? "Starting Fee" : "Pay Rate"}
            value={form.pay}
            handleChangeText={(text) => {
              setForm({ ...form, pay: text });
            }}
            otherStyles="mt-7"
            keyBoardType="numeric"
            placeholder=""
          />
          <View className="space-y-2">
            <Text className="text-base font-lRegular text-[#262322]">Bio</Text>
          </View>
          <View
            style={{ height: 200 }}
            className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl w-full h-16 px-4 focus:border-[#c7c4c1] items-center flex-row"
          >
            <TextInput
              className="flex-1 text-[#262322] font-lRegular text-base pt-4"
              value={form.bio}
              onChangeText={(text) => {
                setForm({ ...form, bio: text });
              }}
              multiline={true}
              numberOfLines={10}
              style={{ height: 200 }}
            ></TextInput>
          </View>
          <View className="space-y-2">
            <Text className="text-base font-lRegular text-[#262322]">
              Profile Image
            </Text>
          </View>
          <ImagePickerScreen form={form} setForm={setForm} />
          <CustomButton
            title="Submit"
            handlePress={submit}
            containerStyles="mt-7"
            textStyles=""
            isLoading={false}
          ></CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfile;
