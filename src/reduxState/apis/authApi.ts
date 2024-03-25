import baseCreateApi from "./baseCreateApi";

const getheaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
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
    registerUser: builder.mutation({
      query: (queryArgs) => ({
        url: "user/register",
        method: "POST",
        // headers: getheaders(),
        body: queryArgs,
      }),
    }),
    googleAuth: builder.query({
      query: () => ({
        url: "auth/login/success",
        method: "GET",
        headers: getheaders(),
      }),
    }),
    googleAuthLogout: builder.query({
      query: () => ({
        url: "auth/logout",
        method: "GET",
        headers: getheaders(),
      }),
    }),
    user: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      })
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useLazyGoogleAuthQuery,
  useLazyGoogleAuthLogoutQuery,
  useUserQuery
} = authApi;
