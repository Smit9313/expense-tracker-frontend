import baseCreateApi from "./baseCreateApi";

const expeneseCategoryhandler = async ({ dispatch, queryFulfilled }: any) => {
  try {
    const data = await queryFulfilled;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const expenseCategoryApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenseCategory: builder.query({
      query: () => ({
        url: "expenseCategory/getExpenseCategory",
        method: "POST",
      }),
      onQueryStarted(args, { dispatch, queryFulfilled }) {
        expeneseCategoryhandler({ dispatch, queryFulfilled });
      },
    }),
  }),
});

export const { useLazyGetExpenseCategoryQuery } = expenseCategoryApi;
