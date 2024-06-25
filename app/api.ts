import {
  UserCredentials,
  conversationDataSchema,
  messageSchema,
  messagesSchema,
  userDataSchema,
  userSchema,
  usersSchema,
} from "../types/types";
import * as SecureStorage from "expo-secure-store";

const API_URL = "http://localhost:3001";
// const JWT = SecureStorage.getItemAsync("JWT");

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
          return { token: token, data: data };
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
          throw Error("Unauthorized");
        } else {
          return response.json();
        }
      })
      .then((user) => {
        return userSchema.parse(user);
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
        userSchema.parse(user);
      });
  },
  updateCurrentUserPicture: (data: FormData) => {
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
      .then((res) => console.log("pic updated", res.data.image));
  },
  getUsers: (
    token: string,
    userAttribute: string,
    userAttributeValue: string
  ) => {
    return fetch(`${API_URL}/users/${userAttribute}/${userAttributeValue}`, {
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
            throw Error(error.error);
          });
        } else {
          return response.json();
        }
      })
      .then((users) => {
        return usersSchema.parse(users);
      });
  },
  approveUser: (token: string, userId: number) => {
    return fetch(`${API_URL}/users/approve/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw Error(error.error);
        });
      } else {
        return response.json();
      }
    });
  },
  declineUser: (token: string, userId: number) => {
    return fetch(`${API_URL}/users/decline/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw Error(error.error);
        });
      } else {
        return response.json();
      }
    });
  },
  getUserLinks: (token: string) => {
    return fetch(`${API_URL}/current_user/links`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Unauthorized");
        } else {
          return response.json();
        }
      })
      .then((links) => {
        return usersSchema.parse(links);
      });
  },
  openConversation: (token: string, userId: number) => {
    return fetch(`${API_URL}/current_user/open_conversation/${userId}`, {
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
            throw Error(error.error);
          });
        } else {
          return response.json();
        }
      })
      .then((conversationData) => {
        return conversationDataSchema.parse(conversationData);
      });
  },
  postMessage: (token: string, messageData: {}) => {
    return fetch(`${API_URL}/messages`, {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw Error(error.error);
          });
        } else {
          return response.json();
        }
      })
      .then((message) => {
        return messageSchema.parse(message);
      });
  },
};
