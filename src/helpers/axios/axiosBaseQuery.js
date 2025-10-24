import { instance as axiosInstance } from "./axiosInstance";



export const axiosBaseQuery =
  (
    { baseUrl }= { baseUrl: "" }
  ) =>
    async ({ url, method, data, params, contentType }) => {
      try {
        const result = await axiosInstance ({
          url: baseUrl + url,
          method,
          data,
          params,
          headers: {
            "Content-Type": contentType || "application/json",
          },
        });
        if (result?.success) {
          return result
        } else {
          return {
            error: {
              statusCode: result?.statusCode,
              message: result?.message,
              errorMessages: result?.errorMessages,
              data: result?.data,
            }
          }
        }
      } catch (axiosError) {
        let err = axiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };
