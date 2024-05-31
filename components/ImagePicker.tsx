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
}: {
  setImage: (imageData: ImagePicker.ImagePickerResult) => void;
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

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
    }
  };

  return (
    <View>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
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
