import { ITotalDataResponse } from '../../interfaces/totalData/ItotalData';

export const formateTotalDataResponse = (response: ITotalDataResponse) => {
  const updatedResponse = response?.data
  return updatedResponse;
}