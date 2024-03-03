export interface Iexpense {
  name: string;
  expenseDate: string;
  expenseDetails: string;
  expenseAmount: number;
  _id: string;
  expenseCategoryId: {
    _id: string;
    name: string;
  };
}

export interface IexpenseData extends Iexpense {
	__v: number;
	userId: string;
}

export interface IexpenseResponse {
	code: number;
	data: IexpenseData[];
	message: string;
	status: boolean;
}

export interface IexpenseDisplay {
  date: string;
  category: string;
  amount: number;
  details: string;
  _id: string;
  key: number;
}