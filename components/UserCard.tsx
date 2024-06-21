import { View, Text, Image } from "react-native";
import React from "react";
import { User } from "../types/types";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as SecureStore from "expo-secure-store";
import { Requests } from "../app/api";
import { toast } from "@backpackapp-io/react-native-toast";
import Toast from "react-native-toast-message";
import { useAuth } from "../app/context/AuthContext";

const UserCard = ({
  user,
  profileRole,
  setUserProfiles,
}: {
  user: User;
  profileRole: "care_seeker" | "care_provider";
  setUserProfiles: (users: User[]) => void;
}) => {
  const { getCurrentUserData, getLinks } = useAuth();

  const likeUser = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      return await Requests.approveUser(token, user.id);
    }
  };
  const dislikeUser = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      return await Requests.declineUser(token, user.id);
    }
  };
  const getUserProfiles = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      return await Requests.getUsers(token, "role", profileRole).then((users) =>
        setUserProfiles(users)
      );
    }
  };

  const getUserData = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      return getCurrentUserData(token).then(() => getLinks(token));
    }
  };
  const leftSwipeAction = () => {
    return (
      <View className="flex justify-center items-center px-6">
        <View>
          <Image
            source={require("../assets/icons/broken-link.png")}
            resizeMode="contain"
            className="w-11 h-12"
          />
        </View>
        <Text className="text-[#78716c] font-lRegular text-base mt-2">
          Decline link for
        </Text>
        <Text className="text-[#262322] text-xl font-lBold">
          {user?.username}
        </Text>
      </View>
    );
  };
  const rightSwipeAction = () => {
    return (
      <View className="flex justify-center items-center px-6">
        <View>
          <Image
            source={require("../assets/icons/link.png")}
            resizeMode="contain"
            className="w-11 h-12"
          />
        </View>
        <Text className="text-[#78716c] font-lRegular text-base mt-2">
          Request Link for
        </Text>
        <Text className="text-[#262322] text-xl font-lBold">
          {user?.username}
        </Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={leftSwipeAction}
      renderRightActions={rightSwipeAction}
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          likeUser()
            .then((response) =>
              Toast.show({
                type: "linkToast",
                props: { text: response.message },
              })
            )
            .then(() => getUserProfiles())
            .then(() => getUserData())
            .catch((error) => {
              console.log(error);
              Toast.show({
                type: "errorToast",
                props: { text: "Unable to request link" },
              });
            });
        } else if (direction === "left") {
          dislikeUser()
            .then((response) =>
              Toast.show({
                type: "declinedLinkToast",
                props: { text: response.message },
              })
            )
            .then(() => getUserProfiles())
            .then(() => getUserData())
            .catch((error) =>
              Toast.show({
                type: "errorToast",
                props: { text: "Unable to decline link" },
              })
            );
        }
      }}
    >
      <View className="px-6 mx-4 my-4  bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl">
        <Text className="text-[#262322] text-2xl font-lBold mt-2">
          {user?.username}
        </Text>
        <View className="justify-between items-start flex-row mb-2">
          <View>
            {user.role === "care_provider" ? (
              <Text className="text-[#78716c] font-lRegular text-sm">
                Years of experience: {user.years_experience}
              </Text>
            ) : (
              <Text className="text-[#78716c] font-lRegular text-sm">
                Number of children: {user.years_experience}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-[#78716c] font-lRegular text-sm">
              ${user.pay}/hr
            </Text>
          </View>
        </View>

        <View className="flex justify-around">
          <Image
            source={{ uri: `http://localhost:3001/${user.image_url}` }}
            style={{ width: 300, height: 300, margin: "auto" }}
            className="rounded"
          />
        </View>

        <Text className="text-[#78716c] font-lRegular text-sm mb-2 mt-2">
          {user.bio}
        </Text>
      </View>
    </Swipeable>
  );
};

export default UserCard;
