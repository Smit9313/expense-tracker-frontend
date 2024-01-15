import { axiosClient } from "./apiClient";

export function login(data: { email: string; password: string; }) {
  return axiosClient.post("user/login", data);
}
