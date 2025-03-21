// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilteredOrdersPageResultDto, OrderByDateParams } from "./types";

export const ordersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8181" }),
  reducerPath: "quotesApi",
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    getOrdersByDate: build.query<
      FilteredOrdersPageResultDto,
      OrderByDateParams
    >({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        body: payload,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersByDateQuery } = ordersApiSlice;
