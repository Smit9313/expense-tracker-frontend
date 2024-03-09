import { ITotalDataResponse } from '../../interfaces/totalData/ItotalData';
import { formateTotalDataResponse } from '../../services/totalData/dashboardPage';
import { setIncome } from '../slices/totalDataSlice';
import baseCreateApi from "./baseCreateApi";

const totalDatahandler = async ({ dispatch, queryFulfilled }: any) => {
  try {
    const data = await queryFulfilled;
    if(data.status){
      dispatch(setIncome(data.data))
    }
    
  } catch (error) {
    console.log(error);
  }
};

export const totalDataApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalData: builder.query({
      query: () => ({
        url: "total/totaltransactions",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        totalDatahandler({ dispatch, queryFulfilled });
      },
      transformResponse: (response: ITotalDataResponse) => {
        return formateTotalDataResponse(response);
      },
    }),
  }),
});

export const { useGetTotalDataQuery } = totalDataApi;
