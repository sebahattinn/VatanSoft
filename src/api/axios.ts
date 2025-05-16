import axios from "axios";
import { toast } from "sonner";

import { getApiConfig } from "./config";

const { apiUrl } = getApiConfig();

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 400) {
      handle400Error(err.response.data);
      return Promise.resolve(undefined);
    }
    return Promise.reject(err);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handle400Error(data: any) {
  if (Array.isArray(data)) {
    data.forEach((res: { code: string; name: string }) => {
      toast.error(`${res.code}: ${res.name}`);
    });
  } else if (data?.errors && Array.isArray(data.errors)) {
    data.errors.forEach((res: { code: string; name: string }) => {
      toast.error(`${res.code}: ${res.name}`);
    });
  } else if (data?.code && data?.name) {
    toast.error(`${data.code}: ${data.name}`);
  } else {
    toast.error("Geçersiz istek. Lütfen bilgilerinizi kontrol edin.");
    console.error("Unhandled 400 error structure:", data);
  }
}

export default api;
