import baseCreateApi from "./baseCreateApi";

export const remainderApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getRemainder: builder.query({
      query: () => ({
        url: "notification",
        method: "GET",
      }),
      providesTags: ["remainder"],
      keepUnusedDataFor: 0,
    }),
    getRemainderById: builder.query({
      query: (queryArgs) => ({
        url: `notification/${queryArgs.remainderId}`,
        method: "GET",
      }),
      providesTags: ["remainder"],
    }),
    createRemainder: builder.mutation({
      query: (queryArgs) => ({
        url: "notification",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editRemainder: builder.mutation({
      query: (queryArgs) => ({
        url: `notification/${queryArgs.remainderId}`,
        method: "PATCH",  
        body: queryArgs,
      }),
      invalidatesTags: ["remainder"],
    }),
    deleteRemainder: builder.mutation({
      query: (queryArgs) => ({
        url: `notification/${queryArgs.remainderId}`,
        method: "DELETE",
        body: queryArgs,
      }),
      invalidatesTags: ["remainder"],
    }),
  }),
});

export const {
  useGetRemainderQuery,
  useGetRemainderByIdQuery,
  useCreateRemainderMutation,
  useEditRemainderMutation,
  useDeleteRemainderMutation,
} = remainderApi;
