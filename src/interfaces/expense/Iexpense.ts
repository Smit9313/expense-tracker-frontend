export interface Iexpense {
	name: string;
	expenseDate: string;
	expenseDetails: string;
	expenseAmount: number;
	_id: string;
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
  