import baseCreateApi from "./baseCreateApi";

const expeneseCategoryhandler = async ({ dispatch, queryFulfilled }: any) => {
  try {
    const data = await queryFulfilled;
  } catch (error) {
    console.log(error);
  }
};

export const expenseCategoryApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenseCategory: builder.query({
      query: () => ({
        url: "expenseCategory/getExpenseCategory",
        method: "GET",
      }),
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        expeneseCategoryhandler({ dispatch, queryFulfilled });
      },
      keepUnusedDataFor: 0,
    }),
    deleteExpenseCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `expenseCategory/deleteExpenseCategory/${queryArgs.expenseCategoryId}`,
        method: "DELETE",
        body: queryArgs,
      }),
    }),
  }),
});

export const {
  useLazyGetExpenseCategoryQuery,
  useDeleteExpenseCategoryMutation,
} = expenseCategoryApi;
