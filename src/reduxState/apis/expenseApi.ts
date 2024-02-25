import baseCreateApi from "./baseCreateApi";

export const expenseApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "expense/getExpenses",
        method: "GET",
      }),
      // onQueryStarted(_args, { dispatch, queryFulfilled }) {
      //   expeneseCategoryhandler({ dispatch, queryFulfilled });
      // },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
	useLazyGetExpensesQuery
} = expenseApi
