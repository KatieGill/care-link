import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile-type"
          options={{
            headerShown: false,
            title: "Profile Type",
          }}
        />
        <Stack.Screen
          name="complete-profile"
          options={{
            headerShown: false,
            title: "Complete Profile",
          }}
        />
        <Stack.Screen
          name="profile-picture"
          options={{
            headerShown: false,
            title: "Profile Picture",
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
