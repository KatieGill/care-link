import {
  View,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfilePicture from "../(auth)/profile-picture";
import { Requests } from "../api";
import * as SecureStore from "expo-secure-store";
import CustomButton from "../../components/CustomButton";
import { User } from "../../types/types";

const Links = () => {
  const [links, setLinks] = useState<User[]>();

  useEffect(() => {
    const getLinks = async () => {
      const token = await SecureStore.getItemAsync("JWT");
      if (token) {
        return await Requests.getUserLinks(token).then((links) =>
          setLinks(links)
        );
      }
    };
    getLinks();
  }, []);

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <FlatList
        data={links}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="px-6 mx-4 my-4  bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl flex-row justify-start items-center">
            <View className="my-2 mr-2">
              <Image
                source={{
                  uri: `http://localhost:3001/${item.image_url}`,
                }}
                style={{ width: 100, height: 100, margin: "auto" }}
                className="rounded-full"
              />
            </View>

            <View className="m-2">
              <Text className="text-[#262322] text-2xl font-lBold">
                {item.username}
              </Text>
              <Text className="text-[#78716c] font-lRegular text-sm">
                {item.first_name}
              </Text>
              <Text className="text-[#78716c] font-lRegular text-sm">
                {item.last_name}
              </Text>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-[#78716c] font-lRegular text-sm">
                  Your Current
                </Text>
                <Text className="text-[#262322] text-2xl font-lBold">
                  Links
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={require("../../assets/icons/link.png")}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Links;
