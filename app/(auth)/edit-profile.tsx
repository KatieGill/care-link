import { View, Text, TextInput, ScrollView } from "react-native";
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

const EditProfile = () => {
  const { authState, updateCurrentUserData, updateCurrentUserPicture } =
    useAuth();
  const { user } = authState;
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(
    user?.image_url
  );
  const [form, setForm] = useState<UserFormInput>({
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
        .then(() => router.push("/profile"));
    } else {
      updateCurrentUserData(form).then(() => router.push("/profile"));
    }
  };

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4">
          <Text className="text-[#262322] font-lRegular my-4 text-xl">
            Update your user profile
          </Text>
          <UserForm form={form} setForm={setForm} />
          <View className="space-y-2">
            <Text className="text-base font-lRegular text-[#262322]">
              Profile Image
            </Text>
          </View>
          <ImagePickerScreen
            setImage={handleSetImage}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            isEdit={true}
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

export default EditProfile;
