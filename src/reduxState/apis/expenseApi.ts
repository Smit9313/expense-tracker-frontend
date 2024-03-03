import baseCreateApi from "./baseCreateApi";

export const expenseApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "expense/getExpenses",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["expense"],
      transformResponse: (response: any) => {
        console.log(response)
        return response;
      },
    }),
    getExpensebyId: builder.query({
      query: (queryArgs) => ({
        url: `expense/getExpenses/${queryArgs.expenseId}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
    createExpense: builder.mutation({
      query: (queryArgs) => ({
        url: "expense/createExpense",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editExpense: builder.mutation({
      query: (queryArgs) => ({
        url: `expense/editExpense/${queryArgs.expenseId}`,
        method: "PATCH",
        body: queryArgs,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (queryArgs) => ({
        url: `expense/deleteExpense/${queryArgs.expenseId}`,
        method: "DELETE",
        body: queryArgs,
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpensebyIdQuery,
  useEditExpenseMutation,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
