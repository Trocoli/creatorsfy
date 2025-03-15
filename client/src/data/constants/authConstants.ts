export type UserLoginParams = {
  username: string;
  password: string;
};

export const authEndpoints = {
  loginUrl: "/login",
  logoutUrl: "/logout",
  token: "/token",
  userInfo: "/userinfo",
};

export const authLoginParams = {
  response_type: "code",
};

export const authCodeParams = {
  grant_type: "authorization_code",
};

export const authStorageKeys = {
  accessToken: "access_token",
  userInfo: "user_info",
  idToken: "id_token",
} as const;

type keyTypes = keyof typeof authStorageKeys;
export type StorageKey = (typeof authStorageKeys)[keyTypes];

export const urlParams = {
  CLIENT_ID: "CREATORSFY",
  AUTH_SERVER_URL: "http://localhost:8443",
  FRONTEND_INDEX: "http://localhost:3000",
};
