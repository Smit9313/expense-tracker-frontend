import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiV1 } from "../../utils/env";

export const authApiV1 = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiV1 }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (queryArgs) => ({
        url: "user/login",
        method: "POST",
        body: queryArgs,
      }),
    }),
    register: builder.mutation({
      query: (queryArgs) => ({
        url: "user/register",
        method: "POST",
        body: queryArgs,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiV1;
