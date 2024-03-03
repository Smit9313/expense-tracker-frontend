import { IincomeResponse } from "../../interfaces/income/Iincome";

export const formateIncomeResponse = (response: IincomeResponse) => {
  const updatedResponse = response.data.map((val) => {
    return {
      name: val.name,
      incomeDate: val.incomeDate,
      incomeDetails: val.incomeDetails,
      incomeAmount: val.incomeAmount,
      _id: val._id,
      incomeCategoryId: {
        _id: val.incomeCategoryId._id,
        name: val.incomeCategoryId.name,
      },
    };
  });

  return updatedResponse;
};
