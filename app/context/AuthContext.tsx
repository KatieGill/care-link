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
  profileTypeIsSelected: boolean;
  userProfileIsComplete: boolean;
};

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    authenticated: boolean;
  }>({
    user: null,
    authenticated: false,
  });

  const profileTypeIsSelected =
    authState.user?.role === "care_provider" ||
    authState.user?.role === "care_seeker";
  console.log(`profileTypeIsSelected: ${profileTypeIsSelected}`);
  const namesAreDefined =
    authState.user?.first_name !== null &&
    authState.user?.last_name !== null &&
    authState.user?.username !== null;
  const userProfileIsComplete = profileTypeIsSelected && namesAreDefined;
  console.log(`userProfileIsComplete: ${userProfileIsComplete}`);

  const onLogin = async (credentials: UserCredentials) => {
    const userData = await Requests.login(credentials).catch((err) =>
      console.error(err)
    );
    if (userData) {
      setAuthState({
        user: userData.data,
        authenticated: true,
      });
      console.log(userData);
      await SecureStore.setItemAsync("JWT", userData.token);
    } else {
      console.log("Login failed");
    }
  };

  const onSignUp = async (signUp: UserCredentials) => {
    const userData = await Requests.signUp(signUp);
    if (userData) {
      router.push("/sign-in");
    } else {
      console.log("Sign up failed");
    }
  };

  const onLogout = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      await Requests.logout(token);
      await SecureStore.deleteItemAsync("JWT");
      setAuthState({
        user: null,
        authenticated: false,
      });
      router.push("/");
    }
  };

  const getCurrentUserData = async (token: string) => {
    return await Requests.getCurrentUser(token).then((userData) =>
      setAuthState({ user: userData, authenticated: true })
    );
  };

  const updateCurrentUserData = async (data: {}) => {
    const token = await SecureStore.getItemAsync("JWT");
    console.log(token);
    if (token && authState.user) {
      return await Requests.updateCurrentUser(
        token,
        data,
        authState.user.id
      ).then((userData) => getCurrentUserData(token));
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        onLogin,
        onSignUp,
        authState,
        onLogout,
        updateCurrentUserData,
        profileTypeIsSelected,
        userProfileIsComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
