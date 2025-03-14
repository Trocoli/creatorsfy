import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ExternalConfig, loadExternalConfig } from "data/api/config/external";
import { UserInfo, UserLoginParams } from "types";
import { getAuthStoredValue } from "lib/helpers/storageHelper";
import { authStorageKeys, urlParams } from "data/constants/authConstants";

interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: urlParams.AUTH_SERVER_URL,
    prepareHeaders: (headers) => {
      if (!ExternalConfig.loaded) {
        loadExternalConfig();
      }
      const accessToken = getAuthStoredValue(authStorageKeys.accessToken);

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, UserLoginParams>({
      query: (loginInfo: UserLoginParams) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
    // register:
  }),
});

export const { useLoginMutation } = authApiSlice;
