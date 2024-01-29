import { axiosClient } from "./apiClient";

export function login(data: { email: string; password: string }) {
  return axiosClient.post("user/login", data);
}

export function registerUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  return axiosClient.post("user/register", data);
}

export function getExpenseCategory(data: any) {
  return axiosClient.post("expenseCategory/getExpenseCategory", data);
}

export function createExpenseCategory(data: { name: string }) {
  return axiosClient.post("expenseCategory/createExpenseCategory", data);
}

export function editExpenseCategory(data: {
  expenseCategoryId: string | undefined;
  name: string;
}) {
  return axiosClient.post("expenseCategory/editExpenseCategory", data);
}

export function deleteExpenseCategory(data: { expenseCategoryId: string }) {
  return axiosClient.post("expenseCategory/deleteExpenseCategory", data);
}

export function getIncomeCategory(data: any) {
  return axiosClient.post("incomeCategory/getIncomeCategory", data);
}

export function deleteIncomeCategory(data: { incomeCategoryId: string }) {
  return axiosClient.post("incomeCategory/deleteIncomeCategory", data);
}

export function createIncomeCategory(data: { name: string }) {
  return axiosClient.post("incomeCategory/createIncomeCategory", data);
}

export function editIncomeCategory(data: {
  incomeCategoryId: string | undefined;
  name: string;
}) {
  return axiosClient.post("incomeCategory/editIncomeCategory", data);
}

export function getExpenses(data: any) {
  return axiosClient.post("expense/getExpenses", data);
}

export function deleteExpense(data: { expenseId: string }) {
  return axiosClient.post("expense/deleteExpense", data);
}

export function createExpense(data: {
  expenseDate: Date;
  expenseDetails: string;
  expenseAmount: number;
  expenseCategoryId: string;
}) {
  return axiosClient.post("expense/createExpense", data);
}

export function editExpense(data: {
  expenseId: string | undefined,
  expenseDate: Date;
  expenseDetails: string;
  expenseAmount: number;
  expenseCategoryId: string;
}){
  return axiosClient.post("expense/editExpense", data);
}

export function getIncomes(data: any) {
  return axiosClient.post("income/getIncomes", data);
}

export function createIncome(data: {
  incomeDate: Date;
  incomeDetails: string;
  incomeAmount: number;
  incomeCategoryId: string;
}) {
  return axiosClient.post("income/createIncome", data);
}

export function editIncome(data: {
  incomeId: string | undefined,
  incomeDate: Date;
  incomeDetails: string;
  incomeAmount: number;
  incomeCategoryId: string;
}){
  return axiosClient.post("income/editIncome", data);
}

export function deleteIncome(data: { incomeId: string }) {
  return axiosClient.post("income/deleteIncome", data);
}