import { View, Text, TextInput } from "react-native";
import React, { useEffect } from "react";
import FormField from "./FormField";
import type { UserFormInput } from "../types/types";
import { useAuth } from "../app/context/AuthContext";
import UserFormErrorMessage from "./UserFormErrorMessage";
import { number } from "zod";

const UserForm = ({
  form,
  setForm,
  shouldShowErrors,
  setErrorsPresent,
}: {
  form: UserFormInput;
  setForm: (form: UserFormInput) => void;
  shouldShowErrors: boolean;
  setErrorsPresent: (boolean: boolean) => void;
}) => {
  const { authState } = useAuth();
  const { user } = authState;

  const usernameIsValid = (form.username ?? "").length >= 4;
  const firstNameIsValid = (form.first_name ?? "").length >= 2;
  const lastNameIsValid = (form.last_name ?? "").length >= 2;
  const zipCodeLengthIsValid = (form.zip_code ?? "").length === 5;
  const zipCodeCharactersAreValid = form.zip_code?.match(/^[0-9]+$/);
  const yearsExperienceLengthIsValid =
    (form.years_experience ?? "").length <= 2 &&
    (form.years_experience ?? "").length >= 1;
  const yearsExperienceCharactersAreValid =
    form.years_experience?.match(/^[0-9]+$/);
  const numberOfChildrenLengthIsValid =
    (form.number_of_children ?? "").length <= 2 &&
    (form.number_of_children ?? "").length >= 1;
  const numberOfChildrenCharactersAreValid =
    form.number_of_children?.match(/^[0-9]+$/);
  const payLengthIsValid =
    (form.pay ?? "").length <= 2 && (form.pay ?? "").length >= 1;
  const payCharactersAreValid = form.pay?.match(/^[0-9]+$/);
  const bioIsValid = (form.bio ?? "").length >= 20;

  const shouldShowUsernameError = shouldShowErrors && !usernameIsValid;
  const shouldShowFirstNameError = shouldShowErrors && !firstNameIsValid;
  const shouldShowLastNameError = shouldShowErrors && !lastNameIsValid;
  const shouldShowZipCodeLengthError =
    shouldShowErrors && !zipCodeLengthIsValid;
  const shouldShowZipCodeCharactersError =
    shouldShowErrors && !zipCodeCharactersAreValid;
  const shouldShowYearsExperienceLengthError =
    shouldShowErrors && !yearsExperienceLengthIsValid;

  const shouldShowYearsExperienceCharactersError =
    shouldShowErrors && !yearsExperienceCharactersAreValid;
  const shouldShowNumberOfChildrenLengthError =
    shouldShowErrors && !numberOfChildrenLengthIsValid;
  const shouldShowNumberOfChildrenCharactersError =
    shouldShowErrors && !numberOfChildrenCharactersAreValid;
  const shouldShowPayLengthError = shouldShowErrors && !payLengthIsValid;
  const shouldShowPayCharactersError =
    shouldShowErrors && !payCharactersAreValid;
  const shouldShowBioError = shouldShowErrors && !bioIsValid;
  const userErrorsPresent =
    !usernameIsValid ||
    !firstNameIsValid ||
    !lastNameIsValid ||
    !zipCodeCharactersAreValid ||
    !zipCodeLengthIsValid ||
    !payCharactersAreValid ||
    !payLengthIsValid ||
    !bioIsValid;
  const careProviderErrorsPresent =
    userErrorsPresent &&
    (!yearsExperienceCharactersAreValid || !yearsExperienceLengthIsValid);
  const careSeekerErrorsPresent =
    userErrorsPresent &&
    (!numberOfChildrenCharactersAreValid || !numberOfChildrenLengthIsValid);

  useEffect(() => {
    if (user?.role === "care_provider") {
      setErrorsPresent(careProviderErrorsPresent);
    } else {
      setErrorsPresent(careSeekerErrorsPresent);
    }
  }, [careProviderErrorsPresent, careSeekerErrorsPresent]);

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
      <UserFormErrorMessage
        shouldShowError={shouldShowUsernameError}
        errorMessage="Username must be at least 4 characters"
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
      <UserFormErrorMessage
        shouldShowError={shouldShowFirstNameError}
        errorMessage="First name must be at least 2 characters"
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
      <UserFormErrorMessage
        shouldShowError={shouldShowLastNameError}
        errorMessage="Last name must be at least 2 characters"
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
      <UserFormErrorMessage
        shouldShowError={shouldShowZipCodeLengthError}
        errorMessage="Zip Code must be 5 characters"
      />
      <UserFormErrorMessage
        shouldShowError={shouldShowZipCodeCharactersError}
        errorMessage="Zip Code must be numeric characters"
      />
      {user?.role === "care_provider" ? (
        <>
          <FormField
            title="Years of Experience"
            value={
              form.years_experience ? form.years_experience.toString() : ""
            }
            handleChangeText={(text) => {
              setForm({ ...form, years_experience: text });
            }}
            otherStyles="mt-7"
            keyBoardType="numeric"
            placeholder=""
          />
          <UserFormErrorMessage
            shouldShowError={shouldShowYearsExperienceLengthError}
            errorMessage="Years of Experience must be 1-2 characters"
          />
          <UserFormErrorMessage
            shouldShowError={shouldShowYearsExperienceCharactersError}
            errorMessage="Years of Experience must be numeric characters"
          />
        </>
      ) : (
        <>
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
          <UserFormErrorMessage
            shouldShowError={shouldShowNumberOfChildrenLengthError}
            errorMessage="Number of Children must be 1-2 characters"
          />
          <UserFormErrorMessage
            shouldShowError={shouldShowNumberOfChildrenCharactersError}
            errorMessage="Number of Children must be numeric characters"
          />
        </>
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
      <UserFormErrorMessage
        shouldShowError={shouldShowPayLengthError}
        errorMessage={`${
          user?.role === "care_provider" ? "Starting Fee" : "Pay Rate"
        } must be 1-2 characters`}
      />
      <UserFormErrorMessage
        shouldShowError={shouldShowPayCharactersError}
        errorMessage={`${
          user?.role === "care_provider" ? "Starting Fee" : "Pay Rate"
        } must be numeric characters`}
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
      <UserFormErrorMessage
        shouldShowError={shouldShowBioError}
        errorMessage="Bio must be at least 20 characters"
      />
    </>
  );
};

export default UserForm;
