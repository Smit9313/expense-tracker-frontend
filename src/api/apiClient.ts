import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "accept-language": "en",
  },
});

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
    return Promise.reject(error);
  }
);

// axiosClient.defaults.headers.common["Authorization"] =
//   localStorage.getItem("token");
// axiosClient.defaults.headers.common["accept-language"] = "en";

export { axiosClient };