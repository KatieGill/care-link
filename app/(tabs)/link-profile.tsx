import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import ProfileCard from "../../components/ProfileCard";
import { User } from "../../types/types";
import CustomButton from "../../components/CustomButton";

const LinkProfile = () => {
  const params = useLocalSearchParams() as unknown as User;

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <ScrollView>
        <TouchableOpacity onPress={() => router.push("links")}>
          <View className="flex-row justify-start items-center ml-2">
            <View>
              <Image
                source={require("../../assets/icons/left.png")}
                resizeMode="contain"
                className="w-8 h-9"
              />
            </View>
            <Text className="text-[#78716c] font-lRegular text-base">
              Links
            </Text>
          </View>
        </TouchableOpacity>

        <View className="my-6 px-4 flex items-stretch">
          <View className="mb-4 justify-start flex-row">
            <View className="mr-4">
              <Image
                source={{
                  uri: `http://localhost:3001/${params.image_url}`,
                }}
                style={{ width: 150, height: 150, margin: "auto" }}
                className="rounded-full"
              />
            </View>
            <View className="flex justify-between my-4">
              <View>
                <Text className="text-[#262322] text-2xl font-lBold">
                  {params.first_name}
                </Text>
                <Text className="text-[#78716c] font-lRegular text-lg">
                  {params.last_name}
                </Text>
              </View>
              <View>
                <Text className="text-[#78716c] font-lRegular text-base">
                  {params.role === "care_provider"
                    ? "Care Provider"
                    : "Care Seeker"}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[#78716c] font-lRegular text-base">
                    {`Has ${params.number_of_links} link${
                      params.number_of_links == 1 ? "" : "s"
                    }`}
                  </Text>
                  <Image
                    source={require("../../assets/icons/link.png")}
                    resizeMode="contain"
                    className="w-4 h-5 ml-1"
                  />
                </View>
              </View>
            </View>
          </View>
          <CustomButton
            title="Send Message"
            handlePress={() =>
              router.push({ pathname: "open-chat", params: { ...params } })
            }
            containerStyles="px-4 my-2"
            textStyles=""
            isLoading={false}
          />
          <ProfileCard user={params} isLinkProfile={true} />
          <View className="px-6 mb-2 bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl">
            <Text className="text-[#262322] text-xl font-lBold text-center mt-2">
              Bio
            </Text>
            <Text className="text-[#262322] font-lRegular text-base py-4">
              {params.bio}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LinkProfile;
