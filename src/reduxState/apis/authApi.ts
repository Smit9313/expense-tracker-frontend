import baseCreateApi from "./baseCreateApi";

const getheaders = () => {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  };
};

export const authApi = baseCreateApi.injectEndpoints({
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
        headers: getheaders(),
        body: JSON.stringify({
          data: {
            ...queryArgs
          }
        }),
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
