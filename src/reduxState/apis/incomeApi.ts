import baseCreateApi from "./baseCreateApi";
import { formateIncomeResponse } from '../../services/income/IncomePage';
import { IincomeResponse } from '../../interfaces/income/Iincome';

export const incomeApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => ({
        url: "income",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["income"],
      transformResponse: (response: IincomeResponse) => {
        return formateIncomeResponse(response);
      },
    }),
    getIncomebyId: builder.query({
      query: (queryArgs) => ({
        url: `income/${queryArgs.incomeId}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),
    createIncome: builder.mutation({
      query: (queryArgs) => ({
        url: "income",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editIncome: builder.mutation({
      query: (queryArgs) => ({
        url: `income/${queryArgs.incomeId}`,
        method: "PATCH",
        body: queryArgs,
      }),
    }),
    deleteIncome: builder.mutation({
      query: (queryArgs) => ({
        url: `income/${queryArgs.incomeId}`,
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
