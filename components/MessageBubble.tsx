import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../app/context/AuthContext";

const MessageBubble = ({
  body,
  userId,
  messageRead,
}: {
  body: string;
  userId: number;
  messageRead: boolean;
}) => {
  const { authState } = useAuth();
  const userSentMessage = authState.user?.id === userId;

  return (
    <>
      <View className={`flex ${userSentMessage ? "items-end" : ""}`}>
        <View
          className={`p-4 mx-4 my-2 rounded-2xl max-w-[75vw] ${
            userSentMessage ? "bg-[#78716c]" : "bg-[#e2e1df]"
          }`}
        >
          <Text
            className={`font-lRegular text-base ${
              userSentMessage ? "text-[#f4f3f2] text-right" : "text-[#262322]"
            }`}
          >
            {body}
          </Text>
        </View>
      </View>
      <View>
        <Text>{`${messageRead ? "Read" : "Delivered"}`}</Text>
      </View>
    </>
  );
};

export default MessageBubble;
