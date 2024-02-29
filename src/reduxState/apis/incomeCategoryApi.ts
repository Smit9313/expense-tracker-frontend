import baseCreateApi from "./baseCreateApi";

const incomeCategoryhandler = async ({ dispatch, queryFulfilled }: any) => {
  try {
    const data = await queryFulfilled;
  } catch (error) {
    console.log(error);
  }
};

export const incomeCategoryApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomeCategory: builder.query({
      query: () => ({
        url: "incomeCategory/getIncomeCategory",
        method: "GET",
      }),
      providesTags: ["incomeCategory"],
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        incomeCategoryhandler({ dispatch, queryFulfilled });
      },
      keepUnusedDataFor: 0,
    }),
    getIncomeCategoryById: builder.query({
      query: (queryArgs) => ({
        url: `incomeCategory/getIncomeCategory/${queryArgs.incomeCategoryId}`,
        method: "GET",
      }),
      providesTags: ["incomeCategory"],
    }),
    createIncomeCategory: builder.mutation({
      query: (queryArgs) => ({
        url: "incomeCategory/createIncomeCategory",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editIncomeCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `incomeCategory/editIncomeCategory/${queryArgs.incomeCategoryId}`,
        method: "PATCH",
        body: queryArgs,
      }),
      invalidatesTags: ["incomeCategory"],
    }),
    deleteIncomeCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `incomeCategory/deleteIncomeCategory/${queryArgs.incomeCategoryId}`,
        method: "DELETE",
        body: queryArgs,
      }),
      invalidatesTags: ["incomeCategory"],
    }),
  }),
});

export const {
  useGetIncomeCategoryQuery,
  useGetIncomeCategoryByIdQuery,
  useCreateIncomeCategoryMutation,
  useEditIncomeCategoryMutation,
  useDeleteIncomeCategoryMutation,
} = incomeCategoryApi;
