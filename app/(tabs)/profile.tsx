import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { onLogout, authState } = useAuth();
  console.log(authState.user?.image_url);
  return (
    <SafeAreaView>
      {authState.user?.image_url ? (
        <Image
          source={{ uri: `http://localhost:3001/${authState.user?.image_url}` }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      ) : (
        ""
      )}

      <CustomButton
        title="Logout"
        handlePress={onLogout}
        isLoading={false}
        containerStyles="px-4"
        textStyles=""
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
