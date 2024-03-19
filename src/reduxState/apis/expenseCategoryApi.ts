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
        url: "expenseCategory",
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
        url: `expenseCategory/${queryArgs.expenseCategoryId}`,
        method: "GET",
      }),
      providesTags: ["expenseCategory"],
    }),
    createExpenseCategory: builder.mutation({
      query: (queryArgs) => ({
        url: "expenseCategory",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editExpenseCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `expenseCategory/${queryArgs.expenseCategoryId}`,
        method: "PATCH",
        body: queryArgs,
      }),
      invalidatesTags: ["expenseCategory"],
    }),
    deleteExpenseCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `expenseCategory/${queryArgs.expenseCategoryId}`,
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
