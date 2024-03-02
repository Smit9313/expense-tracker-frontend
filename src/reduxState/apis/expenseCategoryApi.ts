import { IecategoryResponse } from "../../interfaces/ecategory/Iecategory";
import { formateECatregoryResponse } from "../../services/ecategory/ExpenseCategoryPage";
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
      providesTags: ["expenseCategory"],
      keepUnusedDataFor: 0,
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        expeneseCategoryhandler({ dispatch, queryFulfilled });
      },
      transformResponse: (response: IecategoryResponse) => {
        return formateECatregoryResponse(response);
      },
    }),
    getExpenseCategoryById: builder.query({
      query: (queryArgs) => ({
        url: `expenseCategory/getExpenseCategory/${queryArgs.expenseCategoryId}`,
        method: "GET",
      }),
      providesTags: ["expenseCategory"],
    }),
    createExpenseCategory: builder.mutation({
      query: (queryArgs) => ({
        url: "expenseCategory/createExpenseCategory",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editExpenseCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `expenseCategory/editExpenseCategory/${queryArgs.expenseCategoryId}`,
        method: "PATCH",
        body: queryArgs,
      }),
      invalidatesTags: ["expenseCategory"],
    }),
    deleteExpenseCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `expenseCategory/deleteExpenseCategory/${queryArgs.expenseCategoryId}`,
        method: "DELETE",
        body: queryArgs,
      }),
      invalidatesTags: ["expenseCategory"],
    }),
  }),
});

export const {
  useGetExpenseCategoryQuery,
  useGetExpenseCategoryByIdQuery,
  useCreateExpenseCategoryMutation,
  useEditExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
} = expenseCategoryApi;
