export interface Iincome {
	name: string;
	incomeDate: string;
	incomeDetails: string;
	incomeAmount: number;
	_id: string;
	incomeCategoryId: {
	  _id: string;
	  name: string;
	};
  }
  
  export interface IincomeData extends Iincome {
	  __v: number;
	  userId: string;
  }
  
  export interface IincomeResponse {
	  code: number;
	  data: IincomeData[];
	  message: string;
	  status: boolean;
  }
  
  export interface IincomeDisplay {
	date: string;
	category: string;
	amount: number;
	details: string;
	_id: string;
	key: number;
  }