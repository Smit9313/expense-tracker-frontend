import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { apiV1 } from "../../utils/env";
import { getToken } from "../../services/utils";
import { loginRedirectCall } from '../../api/apiClient';

const baseQuery = fetchBaseQuery({
  baseUrl: apiV1,
  mode: "cors",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/vnd.api+json");
    // headers.set("Content-Type", "application/vnd.api+json");

    const accessToken = getToken();
    if (accessToken) {
      headers.set("Authorization", accessToken);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      result = await baseQuery(args, api, extraOptions);
      if (result.data) {
      } else {
        // logout user logic
        loginRedirectCall();
      }
    } else {
      console.warn(result);
      if (
        result.error.status === 401 ||
        result.error.status === 403 ||
        result.error.status === 422
        ) {
          // do something with errors
      }
    }
  }
  return result;
};

const baseCreateApi = createApi({
  reducerPath: "api",
  tagTypes: ['expenseCategory', 'incomeCategory', 'expense', 'income', 'remainder'],
  baseQuery: retry(baseQueryWithReauth, { maxRetries: 0 }),
  endpoints: () => ({}),
});

export default baseCreateApi;
