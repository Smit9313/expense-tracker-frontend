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
  return axiosClient.get("expenseCategory/getExpenseCategory", data);
}

export function createExpenseCategory(data: { name: string }) {
  return axiosClient.post("expenseCategory/createExpenseCategory", data);
}

export function deleteExpenseCategory(data: { expenseCategoryId : string}){
  return axiosClient.post("expenseCategory/deleteExpenseCategory", data);
}
