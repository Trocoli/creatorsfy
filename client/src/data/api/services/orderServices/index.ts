// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Order {
  id: number;
  quote: string;
  author: string;
}

interface OrdersApiResponse {
  orders: Order[];
  total: number;
  skip: number;
  limit: number;
}

// Define a service using a base URL and expected endpoints\
// paginated
export const ordersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/quotes" }),
  reducerPath: "quotesApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    getOrders: build.query<OrdersApiResponse, number>({
      query: (limit = 10) => `?limit=${limit}`,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApiSlice;
