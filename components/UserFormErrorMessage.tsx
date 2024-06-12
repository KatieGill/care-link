import { View, Text } from "react-native";
import React from "react";

const UserFormErrorMessage = ({
  shouldShowError,
  errorMessage,
}: {
  shouldShowError: boolean;
  errorMessage: string;
}) => {
  return (
    <Text
      style={shouldShowError ? { display: "flex" } : { display: "none" }}
      className="text-[#bd0a0a] text-base mb-2"
    >
      {errorMessage}
    </Text>
  );
};

export default UserFormErrorMessage;
