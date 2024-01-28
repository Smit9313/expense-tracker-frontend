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

export function editExpenseCategory(data: { expenseCategoryId : string | undefined, name: string}){
  return axiosClient.post("expenseCategory/editExpenseCategory", data);
}

export function deleteExpenseCategory(data: { expenseCategoryId : string}){
  return axiosClient.post("expenseCategory/deleteExpenseCategory", data);
}

export function getIncomeCategory(data: any) {
  return axiosClient.post("incomeCategory/getIncomeCategory", data);
}

export function deleteIncomeCategory(data: { incomeCategoryId : string}){
  return axiosClient.post("incomeCategory/deleteIncomeCategory", data);
}

export function createIncomeCategory(data: { name: string }) {
  return axiosClient.post("incomeCategory/createIncomeCategory", data);
}

export function editIncomeCategory(data: { incomeCategoryId : string | undefined, name: string}){
  return axiosClient.post("incomeCategory/editIncomeCategory", data);
}
