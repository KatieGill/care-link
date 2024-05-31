import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import ImagePickerScreen from "../../components/ImagePicker";
import { Requests } from "../api";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const ProfilePicture = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult>();
  const { updateCurrentUserPicture, authState } = useAuth();

  const handleSetImage = (imageData: ImagePicker.ImagePickerResult) => {
    setImage(imageData);
  };

  const submit = async () => {
    const formData = new FormData();
    if (image?.assets) console.log(image.assets[0]);
    if (image?.assets)
      formData.append("upload[image]", {
        uri: image.assets[0].uri,
        type: image.assets[0].mimeType,
        name: image.assets[0].fileName,
      });
    formData.append("upload[user_id]", authState.user?.id);

    updateCurrentUserPicture(formData);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="space-y-2">
          <Text className="text-base font-lRegular text-[#262322]">
            Profile Image
          </Text>
        </View>
        <ImagePickerScreen setImage={handleSetImage} />
        <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyles="mt-7"
          textStyles=""
          isLoading={false}
        ></CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePicture;
