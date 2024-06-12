import { View, Text, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import ImagePickerScreen from "../../components/ImagePicker";
import * as ImagePicker from "expo-image-picker";
import type { UserFormInput } from "../../types/types";
import UserForm from "../../components/UserForm";

const CompleteProfile = () => {
  const { authState, updateCurrentUserData, updateCurrentUserPicture } =
    useAuth();
  const avatarImage = require("../../assets/images/avatar.png");
  const avatarImageUri = Image.resolveAssetSource(avatarImage).uri;
  const { user } = authState;
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(
    avatarImageUri
  );
  const [form, setForm] = useState<UserFormInput>({
    first_name: null,
    last_name: null,
    username: null,
    zip_code: null,
    number_of_children: null,
    years_experience: null,
    pay: null,
    bio: null,
  });
  const [shouldShowErrors, setShouldShowErrors] = useState(false);
  const [errorsPresent, setErrorsPresent] = useState(false);

  const handleSetImage = (imageData: ImagePicker.ImagePickerResult) => {
    setImage(imageData);
  };
  const submit = () => {
    if (errorsPresent) {
      setShouldShowErrors(true);
    } else {
      const formData = new FormData();
      if (image?.assets) {
        formData.append("upload[image]", {
          uri: image.assets[0].uri,
          type: image.assets[0].mimeType,
          name: image.assets[0].fileName,
        });
      } else {
        formData.append("upload[image]", {
          uri: avatarImageUri,
          type: "image/png",
          name: "avatar.png",
        });
      }
      formData.append("upload[user_id]", authState.user?.id);
      updateCurrentUserData(form)
        .then(() => updateCurrentUserPicture(formData))
        .then(() => router.push("/home"));
    }
  };

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4">
          <Text className="text-[#262322] font-lRegular my-4 text-xl">
            Complete your user profile to get started
          </Text>
          <UserForm
            form={form}
            setForm={setForm}
            shouldShowErrors={shouldShowErrors}
            setErrorsPresent={setErrorsPresent}
          />
          <View className="space-y-2">
            <Text className="text-base font-lRegular text-[#262322]">
              Profile Image
            </Text>
          </View>
          <ImagePickerScreen
            setImage={handleSetImage}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            isEdit={false}
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
