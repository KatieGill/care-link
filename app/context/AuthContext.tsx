import { createContext, useContext, useEffect, useState } from "react";
import { User, UserCredentials } from "../../types/types";
import { Requests } from "../api";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

type AuthProps = {
  authState: { user: User | null; authenticated: boolean | null };
  onSignUp: (signUp: UserCredentials) => Promise<void>;
  onLogin: (login: UserCredentials) => Promise<void>;
  onLogout: () => Promise<void>;
  updateCurrentUserData: (data: {}) => Promise<void>;
  updateCurrentUserPicture: (data: FormData) => Promise<void>;
  profileTypeIsSelected: boolean;
  userProfileIsComplete: boolean;
};

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    user: User;
    authenticated: boolean;
  }>({
    user: {} as User,
    authenticated: false,
  });
  const [profileTypeIsSelected, setProfileTypeIsSelected] = useState(false);
  const [userProfileIsComplete, setUserProfileIsComplete] = useState(false);

  const profileTypeIsSelectedValue =
    authState.user?.role !== null && authState.user?.role !== undefined;

  const userAttributes = Object.values(authState.user);
  const omittedAttribute =
    authState.user.role === "care_provider"
      ? "years_experience"
      : "number_of_children";
  const omittedAttributeIndex = userAttributes.indexOf(omittedAttribute);
  const updatedUserAttributes = userAttributes.splice(omittedAttributeIndex, 1);
  const userProfileIsCompleteValue = !updatedUserAttributes.includes(null);

  console.log("profileTypeIsSelected", profileTypeIsSelected);
  console.log("userProfileIsComplete", userProfileIsComplete);

  const onLogin = async (credentials: UserCredentials) => {
    return await Requests.login(credentials).then((userData) => {
      setAuthState({
        user: userData.data,
        authenticated: true,
      });
      SecureStore.setItemAsync("JWT", userData.token);
    });
  };

  const onSignUp = async (signUp: UserCredentials) => {
    await Requests.signUp(signUp).then(() => router.push("/sign-in"));
  };

  const onLogout = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      await Requests.logout(token)
        .then(() => SecureStore.deleteItemAsync("JWT"))
        .then(() => {
          setAuthState({
            user: {} as User,
            authenticated: false,
          });
        })
        .then(() => router.push("/"));
    }
  };

  const getCurrentUserData = async (token: string) => {
    return await Requests.getCurrentUser(token).then((userData) =>
      setAuthState({ user: userData, authenticated: true })
    );
  };

  const updateCurrentUserData = async (data: {}) => {
    const token = await SecureStore.getItemAsync("JWT");
    console.log("token", token);
    if (token && authState.user) {
      return await Requests.updateCurrentUser(
        token,
        data,
        authState.user.id
      ).then(() => getCurrentUserData(token));
    } else {
      throw new Error("Unauthorized");
    }
  };

  const updateCurrentUserPicture = async (data: FormData) => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token && authState.user) {
      return await Requests.updateCurrentUserPicture(data).then(() =>
        getCurrentUserData(token)
      );
    } else {
      throw new Error("Unauthorized");
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("JWT");
      if (token) {
        getCurrentUserData(token);
      } else {
        console.log("Unauthorized");
      }
    };
    loadToken();
    setProfileTypeIsSelected(profileTypeIsSelectedValue);
    setUserProfileIsComplete(userProfileIsCompleteValue);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        onLogin,
        onSignUp,
        authState,
        onLogout,
        updateCurrentUserData,
        updateCurrentUserPicture,
        profileTypeIsSelected,
        userProfileIsComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
