export interface ITotaldata{
	totalExpense: number | undefined;
	totalIncome: number | undefined;
}

export interface ITotalDataResponse{
	code: number;
	data: ITotaldata;
	message: string;
	status: boolean
}