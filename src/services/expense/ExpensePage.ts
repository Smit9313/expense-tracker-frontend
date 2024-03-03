import { IexpenseResponse } from "../../interfaces/expense/Iexpense";

export const formateExpenseResponse = (response: IexpenseResponse) => {
  const updatedResponse = response.data.map((val) => {
    return {
      name: val.name,
      expenseDate: val.expenseDate,
      expenseDetails: val.expenseDetails,
      expenseAmount: val.expenseAmount,
      _id: val._id,
      expenseCategoryId: {
        _id: val.expenseCategoryId._id,
        name: val.expenseCategoryId.name,
      },
    };
  });

  return updatedResponse;
};
