import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ConversationDataSchema, User } from "../../types/types";
import * as SecureStore from "expo-secure-store";
import { Requests } from "../api";
import MessageBubble from "../../components/MessageBubble";

const OpenChat = () => {
  const params = useLocalSearchParams() as unknown as User;
  const [newMessage, setNewMessage] = useState<string>();
  const [conversationData, setConversationData] =
    useState<ConversationDataSchema>();

  const sendMessage = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      return await Requests.postMessage(token, {
        message: {
          conversation_id: conversationData?.conversation.id,
          body: newMessage,
        },
      })
        .then(() => Requests.openConversation(token, params.id))
        .then((conversationData) => setConversationData(conversationData))
        .then(() => setNewMessage(""));
    }
  };

  useEffect(() => {
    const openConversation = async () => {
      const token = await SecureStore.getItemAsync("JWT");
      if (token) {
        return await Requests.openConversation(token, params.id).then(
          (conversation) => setConversationData(conversation)
        );
      } else {
        throw new Error("Unauthorized");
      }
    };
    openConversation();
  }, [params.id]);

  return (
    <SafeAreaView className="bg-[#f4f3f2 h-full">
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          onPress={() => {
            router.push("chat");
          }}
        >
          <View className="flex-row justify-start items-center ml-2">
            <View>
              <Image
                source={require("../../assets/icons/left.png")}
                resizeMode="contain"
                className="w-8 h-9"
              />
            </View>
            <Text className="text-[#78716c] font-lRegular text-base">
              Messages
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex items-center mx-4">
          <Image
            source={{
              uri: `http://localhost:3001/${params.image_url}`,
            }}
            style={{ width: 50, height: 50, margin: "auto" }}
            className="rounded-full"
          />
          <Text className="text-[#78716c] font-lRegular text-base mx-2">
            {params.username}
          </Text>
        </View>
      </View>
      <FlatList
        data={conversationData?.messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MessageBubble
            body={item.body}
            userId={item.user_id}
            messageRead={item.read}
          />
        )}
        ListEmptyComponent={
          <View className="items-center mt-24">
            <Image
              source={{
                uri: `http://localhost:3001/${params.image_url}`,
              }}
              resizeMode="contain"
              className="w-24 h-24 rounded-full"
            />
            <Text className="text-[#262322] text-2xl font-lBold mt-6">
              No Messages Yet!
            </Text>
            <Text className="text-[#78716c] font-lRegular text-sm">
              Send a message to get the conversation started
            </Text>
          </View>
        }
      />
      <View className="m-4">
        <View
          className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl w-full h-16 px-4 
      focus:border-[#c7c4c1] items-center flex-row"
        >
          <TextInput
            className="flex-1 text-[#262322] font-lRegular text-base"
            value={newMessage}
            placeholder="Send message..."
            placeholderTextColor="#78716c"
            onChangeText={(text) => {
              setNewMessage(text);
            }}
          ></TextInput>

          <TouchableOpacity onPress={() => sendMessage()}>
            <Image
              className="w-6 h-6"
              resizeMode="contain"
              source={require("../../assets/icons/send.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OpenChat;
