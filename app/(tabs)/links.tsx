import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Requests } from "../api";
import * as SecureStore from "expo-secure-store";
import { User } from "../../types/types";
import LinkCard from "../../components/LinkCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { useAuth } from "../context/AuthContext";

const Links = () => {
  const { links } = useAuth();

  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <FlatList
        data={links}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LinkCard user={item} />}
        ListEmptyComponent={
          <EmptyState
            title="You don't have any Links!"
            subtitle="Start requesting links to get started"
          />
        }
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
            <SearchInput />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Links;
