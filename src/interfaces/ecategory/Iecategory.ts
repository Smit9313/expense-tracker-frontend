export interface Iecategory {
  name: string;
  totalExpense: number;
  _id: string;
  key?: number;
}

export interface IecategoryData extends Iecategory {
  __v: number;
  userId: string;
}

export interface IecategoryResponse {
  code: number;
  data: IecategoryData[];
  message: string;
  status: boolean;
}
