import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Image,
  Platform,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "./CustomButton";

const ImagePickerScreen = ({
  setImage,
  setImageUrl,
  imageUrl,
  isEdit,
}: {
  setImage: (imageData: ImagePicker.ImagePickerResult) => void;
  setImageUrl: (imageUrl: string) => void;
  imageUrl: string | undefined | null;
  isEdit: boolean;
}) => {
  const [appendHostToImageUrl, setAppendHostToImageUrl] = useState(isEdit);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== "granted") {
          Alert.alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
      setImage(result);
      setAppendHostToImageUrl(false);
    }
  };

  return (
    <View>
      <View className="mt-2">
        {imageUrl && (
          <Image
            source={{
              uri: appendHostToImageUrl
                ? `http://localhost:3001/${imageUrl}`
                : imageUrl,
            }}
            style={{ width: 200, height: 200, margin: "auto" }}
            className="rounded"
          />
        )}
      </View>

      <CustomButton
        title="Pick an image from camera roll"
        handlePress={pickImage}
        containerStyles="px-4 mt-4"
        textStyles=""
        isLoading={false}
      />
    </View>
  );
};

export default ImagePickerScreen;
