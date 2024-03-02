import { IecategoryResponse } from "../../interfaces/ecategory/Iecategory";

export const formateECatregoryResponse = (response: IecategoryResponse) => {
  const updatedResponse = response.data.map((val) => {
	return {
		_id: val._id,
		name: val.name,
		totalExpense: val.totalExpense,
	}
  });

  return updatedResponse;
};
