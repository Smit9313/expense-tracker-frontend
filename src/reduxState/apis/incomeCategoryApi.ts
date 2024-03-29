import { IicategoryResponse } from '../../interfaces/icategory/Iicategory';
import { formateICatregoryResponse } from '../../services/icategory/IncomeCategoryPage';
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
        url: "incomeCategory",
        method: "GET",
      }),
      providesTags: ["incomeCategory"],
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        incomeCategoryhandler({ dispatch, queryFulfilled });
      },
      keepUnusedDataFor: 0,
      transformResponse: (response: IicategoryResponse) => {
        return formateICatregoryResponse(response);
      },
    }),
    getIncomeCategoryById: builder.query({
      query: (queryArgs) => ({
        url: `incomeCategory/${queryArgs.incomeCategoryId}`,
        method: "GET",
      }),
      providesTags: ["incomeCategory"],
    }),
    createIncomeCategory: builder.mutation({
      query: (queryArgs) => ({
        url: "incomeCategory",
        method: "POST",
        body: queryArgs,
      }),
    }),
    editIncomeCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `incomeCategory/${queryArgs.incomeCategoryId}`,
        method: "PATCH",
        body: queryArgs,
      }),
      invalidatesTags: ["incomeCategory"],
    }),
    deleteIncomeCategory: builder.mutation({
      query: (queryArgs) => ({
        url: `incomeCategory/${queryArgs.incomeCategoryId}`,
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
