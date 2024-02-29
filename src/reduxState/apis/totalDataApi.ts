import baseCreateApi from "./baseCreateApi";

export const totalDataApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalData: builder.query({
      query: () => ({
        url: "total/totaltransactions",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetTotalDataQuery } = totalDataApi;
