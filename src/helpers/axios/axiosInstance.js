
import axios from "axios";

import { accessToken } from "../user/user";
import toast from "react-hot-toast";
import config from "../../config";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject = {
      statusCode: response?.data?.statusCode,
      success: response?.data?.success,
      message: response?.data?.message,
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    const errorMessage = error?.response?.data?.message || "";
    if (errorMessage.toLowerCase().includes("jwt expired")) {
      toast.error("Your session has expired! Please log in again.");
       const baseUrl = config.rootClientUrl
        window.location.replace(`${baseUrl}/signin`);
    }
    const responseObject = {
      success: false,
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return responseObject;
    // return Promise.reject(error);
  }
);

export { instance };
