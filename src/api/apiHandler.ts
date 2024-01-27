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
