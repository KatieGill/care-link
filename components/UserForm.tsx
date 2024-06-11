import { View, Text, TextInput } from "react-native";
import React from "react";
import FormField from "./FormField";
import type { UserFormInput } from "../types/types";
import { useAuth } from "../app/context/AuthContext";

const UserForm = ({
  form,
  setForm,
}: {
  form: UserFormInput;
  setForm: (form: UserFormInput) => void;
}) => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <>
      <FormField
        title="Username"
        value={form.username ? form.username : ""}
        handleChangeText={(text) => {
          setForm({ ...form, username: text });
        }}
        otherStyles="mt-7"
        keyBoardType=""
        placeholder=""
      />
      <FormField
        title="First Name"
        value={form.first_name ? form.first_name : ""}
        handleChangeText={(text) => {
          setForm({ ...form, first_name: text });
        }}
        otherStyles="mt-7"
        keyBoardType=""
        placeholder=""
      />
      <FormField
        title="Last Name"
        value={form.last_name ? form.last_name : ""}
        handleChangeText={(text) => {
          setForm({ ...form, last_name: text });
        }}
        otherStyles="mt-7"
        keyBoardType=""
        placeholder=""
      />
      <FormField
        title="Zip Code"
        value={form.zip_code ? form.zip_code.toString() : ""}
        handleChangeText={(text) => {
          setForm({ ...form, zip_code: text });
        }}
        otherStyles="mt-7"
        keyBoardType="numeric"
        placeholder=""
      />
      {user?.role === "care_provider" ? (
        <FormField
          title="Years of Experience"
          value={form.years_experience ? form.years_experience.toString() : ""}
          handleChangeText={(text) => {
            setForm({ ...form, years_experience: text });
          }}
          otherStyles="mt-7"
          keyBoardType="numeric"
          placeholder=""
        />
      ) : (
        <FormField
          title="Number of Children"
          value={
            form.number_of_children ? form.number_of_children.toString() : ""
          }
          handleChangeText={(text) => {
            setForm({ ...form, number_of_children: text });
          }}
          otherStyles="mt-7"
          keyBoardType="numeric"
          placeholder=""
        />
      )}
      <FormField
        title={user?.role === "care_provider" ? "Starting Fee" : "Pay Rate"}
        value={form.pay ? form.pay.toString() : ""}
        handleChangeText={(text) => {
          setForm({ ...form, pay: text });
        }}
        otherStyles="mt-7"
        keyBoardType="numeric"
        placeholder=""
      />
      <View className="space-y-2">
        <Text className="text-base font-lRegular text-[#262322]">Bio</Text>
      </View>
      <View
        style={{ height: 200 }}
        className="bg-[#e2e1df] border-2 border-[#c7c4c1] rounded-2xl w-full h-16 px-4 focus:border-[#c7c4c1] items-center flex-row"
      >
        <TextInput
          className="flex-1 text-[#262322] font-lRegular text-base pt-4"
          value={form.bio ? form.bio : ""}
          onChangeText={(text) => {
            setForm({ ...form, bio: text });
          }}
          multiline={true}
          numberOfLines={10}
          style={{ height: 200 }}
        ></TextInput>
      </View>
    </>
  );
};

export default UserForm;
