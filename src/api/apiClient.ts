import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "accept-language": "en",
  },
});

export function loginRedirectCall() {
  let path =
    window.location.protocol + "//" + window.location.host + "/auth/signin";
  window.location.href = path;
}

axiosClient.interceptors.request.use(
  function (config) {
    if (
      localStorage.getItem("token") !== undefined ||
      localStorage.getItem("token") !== null
    ) {
      config.headers["authorization"] = localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      loginRedirectCall();
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
