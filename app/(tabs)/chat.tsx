import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../../components/EmptyState";
import ChatCard from "../../components/ChatCard";
import SearchInput from "../../components/SearchInput";

const Chat = () => {
  const { links } = useAuth();
  return (
    <SafeAreaView className="bg-[#f4f3f2] h-full">
      <FlatList
        data={links}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChatCard user={item} />}
        ItemSeparatorComponent={() => (
          <View className="bg-[#c7c4c1] h-0.5 mx-4"></View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="You don't have any Links to message!"
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
                  Messages
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

export default Chat;
