export interface Iicategory {
	name: string;
	totalIncome: number;
	_id: string;
  }
  
  export interface IicategoryData extends Iicategory {
	__v: number;
	userId: string;
  }
  
  export interface IicategoryResponse {
	code: number;
	data: IicategoryData[];
	message: string;
	status: boolean;
  }
  