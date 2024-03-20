import baseCreateApi from "./baseCreateApi";

export const remainderApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getRemainder: builder.query({
      query: () => ({
        url: "remainder",
        method: "GET",
      }),
      providesTags: ["remainder"],
      keepUnusedDataFor: 0,
    }),
    getRemainderById: builder.query({
      query: (queryArgs) => ({
        url: `remainder/${queryArgs.remainderId}`,
        method: "GET",
      }),
      providesTags: ["remainder"],
    }),
    createRemainder: builder.mutation({
      query: (queryArgs) => ({
        url: "remainder",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editRemainder: builder.mutation({
      query: (queryArgs) => ({
        url: `remainder/${queryArgs.remainderId}`,
        method: "PATCH",
        body: queryArgs,
      }),
      invalidatesTags: ["remainder"],
    }),
    deleteRemainder: builder.mutation({
      query: (queryArgs) => ({
        url: `remainder/${queryArgs.remainderId}`,
        method: "DELETE",
        body: queryArgs,
      }),
      invalidatesTags: ["remainder"],
    }),
  }),
});

export const {
  useLazyGetRemainderQuery,
  useLazyGetRemainderByIdQuery,
  useCreateRemainderMutation,
  useEditRemainderMutation,
  useDeleteRemainderMutation,
} = remainderApi;
