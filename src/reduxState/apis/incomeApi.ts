import baseCreateApi from "./baseCreateApi";

export const incomeApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => ({
        url: "income/getIncomes",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["income"],
    }),
    getIncomebyId: builder.query({
      query: (queryArgs) => ({
        url: `income/getIncomes/${queryArgs.incomeId}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),
    createIncome: builder.mutation({
      query: (queryArgs) => ({
        url: "income/createIncome",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editIncome: builder.mutation({
      query: (queryArgs) => ({
        url: `income/editIncome/${queryArgs.incomeId}`,
        method: "PATCH",
        body: queryArgs,
      }),
    }),
    deleteIncome: builder.mutation({
      query: (queryArgs) => ({
        url: `income/deleteIncome/${queryArgs.incomeId}`,
        method: "DELETE",
        body: queryArgs,
      }),
      invalidatesTags: ["income"],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useGetIncomebyIdQuery,
  useEditIncomeMutation,
  useCreateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
