import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";

import { getApiConfig } from "@/api/config";

// Lazy initialization of axios instance
const createApi = () => {
  const { apiUrl, rapidApiKey, rapidApiHost } = getApiConfig();

  const api = axios.create({
    baseURL: apiUrl,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
    },
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (err.response) {
        const message = err.response.data?.message || "Bir hata oluştu";
        toast.error(message);
      }
      return Promise.reject(err);
    }
  );

  return api;
};

let apiInstance: ReturnType<typeof createApi>;

const getApi = () => {
  if (!apiInstance) {
    apiInstance = createApi();
  }
  return apiInstance;
};

export const api = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => getApi().get<T>(url, config),
  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => getApi().post<T>(url, data, config),
  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => getApi().put<T>(url, data, config),
  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => getApi().delete<T>(url, config),
};

export default api;
