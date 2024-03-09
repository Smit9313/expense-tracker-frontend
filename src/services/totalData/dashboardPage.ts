import { ITotalDataResponse } from '../../interfaces/totalData/ItotalData';

export const formateTotalDataResponse = (response: ITotalDataResponse) => {
	console.log(response)
  const updatedResponse = response?.data
  return updatedResponse;
}