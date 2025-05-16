import axios from "axios";
import { toast } from "sonner";
import { getApiConfig } from "./config";

const config = getApiConfig();

const exerciseApi = axios.create({
  baseURL: "https://exercisedb.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": config.rapidApiKey || import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
});

// API hata mesajlarını özelleştirme
const getErrorMessage = (status: number, message?: string) => {
  switch (status) {
    case 401:
      return "API anahtarı geçersiz. Lütfen geçerli bir API anahtarı sağlayın.";
    case 403:
      return "Bu API'ye erişim yetkiniz yok.";
    case 404:
      return "Aradığınız kaynak bulunamadı.";
    case 429:
      return "API istek limiti aşıldı. Lütfen daha sonra tekrar deneyin.";
    case 500:
      return "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
    default:
      return message || "Bir hata oluştu. Lütfen tekrar deneyin.";
  }
};

exerciseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = getErrorMessage(status, error.response.data?.message);

      // Hata mesajını göster
      toast.error(message);

      // Console'a detaylı hata bilgisi
      console.error("API Error:", {
        status,
        message: error.response.data?.message,
        path: error.config?.url,
        method: error.config?.method,
      });
    } else if (error.request) {
      toast.error("Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.");
    } else {
      toast.error("İstek oluşturulurken bir hata oluştu");
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default exerciseApi;
