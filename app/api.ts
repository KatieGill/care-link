import {
  UserCredentials,
  userDataSchema,
  userSchema,
  usersSchema,
} from "../types/types";
import * as SecureStorage from "expo-secure-store";

const API_URL = "http://localhost:3001";
const JWT = SecureStorage.getItemAsync("JWT");

export const Requests = {
  login: (login: UserCredentials) => {
    return fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw Error(error.status.message);
          });
        } else {
          const token = response.headers.get("authorization");
          const data = await response.json();
          return { token: token, data: data.data };
        }
      })
      .then((userData) => userDataSchema.parse(userData));
  },
  signUp: (signUp: UserCredentials) => {
    return fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(signUp),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw Error(error.status.message);
          });
        } else {
          return response.json();
        }
      })
      .then((user) => userSchema.parse(user.data));
  },
  logout: (token: string) => {
    return fetch(`${API_URL}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    });
  },
  getCurrentUser: (token: string) => {
    return fetch(`${API_URL}/current_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw Error(error.status.message);
          });
        } else {
          return response.json();
        }
      })
      .then((user) => {
        console.log("current user", user);
        return userSchema.parse(user.data);
      });
  },
  updateCurrentUser: (token: string, data: {}, userId: number) => {
    return fetch(`${API_URL}/current_user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw Error(error.status.message);
          });
        } else {
          return response.json();
        }
      })
      .then((user) => {
        console.log("current user", user);
        userSchema.parse(user.data);
      });
  },
  updateCurrentUserPicture: (data: FormData) => {
    // const csrfToken = (async () => {
    //   const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    //   const { document } = dom.window;
    //   return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    // })();
    // const headers = new Headers();
    // const token = await csrfToken;
    // if (token) {
    //   headers.set("X-CSRF-Token", token);
    // } else {
    //   throw new Error("CSRF token not found");
    // }
    return fetch(`${API_URL}/uploads`, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw Error(error.status.message);
          });
        } else {
          return response.json();
        }
      })
      .then((user) => console.log(user));
  },
  // updateCurrentUserPicture: (token: string, data: FormData, userId: number) => {
  //   return fetch(`${API_URL}/current_user/${userId}`, {
  //     method: "POST",
  //     body: data,
  //     headers: {
  //       Authorization: token,
  //     },
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         return response.json().then((error) => {
  //           throw Error(error.status.message);
  //         });
  //       } else {
  //         return response.json();
  //       }
  //     })
  //     .then((user) => console.log(user));
  // },
  getUsers: (userAttribute: string, userAttributeValue: string) => {
    return fetch(`${API_URL}/users/${userAttribute}/${userAttributeValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw Error(error.status.message);
          });
        } else {
          return response.json();
        }
      })
      .then((users) => {
        console.log("users", users);
        return usersSchema.parse(users.data);
      });
  },
};
