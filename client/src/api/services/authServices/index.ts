import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ExternalConfig } from "api/config/external";
import { UserLoginParams } from "api/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ExternalConfig.AUTH_SERVER_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo: UserLoginParams) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
    // register:
  }),
});

export const { useLoginMutation } = authApi;
