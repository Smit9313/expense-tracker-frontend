import { IexpenseResponse } from "../../interfaces/expense/Iexpense";
import { formateExpenseResponse } from "../../services/expense/ExpensePage";
import baseCreateApi from "./baseCreateApi";

export const expenseApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "expense",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["expense"],
      transformResponse: (response: IexpenseResponse) => {
        return formateExpenseResponse(response);
      },
    }),
    getExpensebyId: builder.query({
      query: (queryArgs) => ({
        url: `expense/${queryArgs.expenseId}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
    createExpense: builder.mutation({
      query: (queryArgs) => ({
        url: "expense",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editExpense: builder.mutation({
      query: (queryArgs) => ({
        url: `expense/${queryArgs.expenseId}`,
        method: "PATCH",
        body: queryArgs,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (queryArgs) => ({
        url: `expense/${queryArgs.expenseId}`,
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
