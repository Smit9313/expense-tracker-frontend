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
        headers: {
          "Content-type": "application/json",
        },
        crossDomain: true,
        body: queryArgs,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
