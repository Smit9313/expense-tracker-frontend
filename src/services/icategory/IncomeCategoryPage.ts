import { IicategoryResponse } from "../../interfaces/icategory/Iicategory";

export const formateICatregoryResponse = (response: IicategoryResponse) => {
  const updatedResponse = response.data.map((val) => {
	return {
		_id: val._id,
		name: val.name,
		totalIncome: val.totalIncome,
	}
  });

  return updatedResponse;
};