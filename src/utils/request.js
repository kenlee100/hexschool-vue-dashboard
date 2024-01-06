import axios from "axios";
import { userStore } from "@/stores/user";
import { useLoadingState } from "@/stores/common";
import router from "@/router";
import toast from "@/utils/toast";
const { VITE_URL } = import.meta.env;
const service = axios.create({
  baseURL: VITE_URL,
  // timeout: 60 * 1000, // request timeout
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    // token 判斷
    const user = userStore();
    if (user.token && config.headers) {
      config.headers.Authorization = user.token;
      // console.log("config", config);
    } else {
      router.push("/");
    }

    return config;
  },
  (error) => {
    useLoadingState().isLoading = false;
    toast.fire({
      icon: "error",
      title: `${error.response.data.message}`,
    });
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const user = userStore();
    const { response } = error;
    // console.log("error", error);
    // let errorMessage = "";
    if (response) {
      useLoadingState().isLoading = false;
      // console.log("response", response);

      switch (response.status) {
        case 400:
          // console.log("errorMessage", response);
          toast.fire({
            icon: "error",
            title: `${response.data.message[0]}`,
          });
          break;
        case 401:
          user.cleanTokenAndInfo();
          router.push("/");
          toast.fire({
            icon: "error",
            title: `${response.data.message[0]}`,
          });
          break;
        default:
          // console.log("errorMessage", response);
          toast.fire({
            icon: "error",
            title: `${response.data.message}`,
          });
      }
    }
    useLoadingState().isLoading = false;
    return Promise.reject(error);
  }
);

export default service;
// https://ithelp.ithome.com.tw/articles/10304656
