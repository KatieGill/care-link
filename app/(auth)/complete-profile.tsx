import { View, Text, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import ImagePickerScreen from "../../components/ImagePicker";
import * as ImagePicker from "expo-image-picker";

const CompleteProfile = () => {
  const { authState, updateCurrentUserData, updateCurrentUserPicture } =
    useAuth();
  const { user } = authState;
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(
    user?.image_url
  );
  const [form, setForm] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    username: user?.username,
    zip_code: user?.zip_code,
    number_of_children: user?.number_of_children,
    years_experience: user?.years_experience,
    pay: user?.pay,
    bio: user?.bio,
  });

  const handleSetImage = (imageData: ImagePicker.ImagePickerResult) => {
    setImage(imageData);
  };
  const submit = () => {
    const formData = new FormData();
    if (image?.assets) {
      formData.append("upload[image]", {
        uri: image.assets[0].uri,
        type: image.assets[0].mimeType,
        name: image.assets[0].fileName,
      });
      formData.append("upload[user_id]", authState.user?.id);
      updateCurrentUserData(form)
        .then(() => updateCurrentUserPicture(formData))
        .then(() => router.push("/home"));
    } else {
      updateCurrentUserData(form).then(() => router.push("/profile"));
    }
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
            value={form.username ? form.username : ""}
            handleChangeText={(text) => {
              setForm({ ...form, username: text });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <FormField
            title="First Name"
            value={form.first_name ? form.first_name : ""}
            handleChangeText={(text) => {
              setForm({ ...form, first_name: text });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <FormField
            title="Last Name"
            value={form.last_name ? form.last_name : ""}
            handleChangeText={(text) => {
              setForm({ ...form, last_name: text });
            }}
            otherStyles="mt-7"
            keyBoardType=""
            placeholder=""
          />
          <FormField
            title="Zip Code"
            value={form.zip_code ? form.zip_code.toString() : ""}
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
              value={
                form.years_experience ? form.years_experience.toString() : ""
              }
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
              value={
                form.number_of_children
                  ? form.number_of_children.toString()
                  : ""
              }
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
            value={form.pay ? form.pay.toString() : ""}
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
              value={form.bio ? form.bio : ""}
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
          <ImagePickerScreen
            setImage={handleSetImage}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
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
