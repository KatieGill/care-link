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
    user: User | null;
    authenticated: boolean;
  }>({
    user: null,
    authenticated: false,
  });
  const [profileTypeIsSelected, setProfileTypeIsSelected] = useState(false);
  const [userProfileIsComplete, setUserProfileIsComplete] = useState(false);

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
    await Requests.signUp(signUp).then(() => router.push("/login"));
  };

  const onLogout = async () => {
    const token = await SecureStore.getItemAsync("JWT");
    if (token) {
      await Requests.logout(token)
        .then(() => SecureStore.deleteItemAsync("JWT"))
        .then(() => {
          setAuthState({
            user: null,
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
