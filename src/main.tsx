import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import App from "./App.tsx";
import { queryClient } from "./lib/react-query.ts";
import { setApiConfig } from "./api/config";
import ErrorScreen from "./components/ErrorScreen"; // Yeni eklenen bileşen
import "./index.css";

// Render point
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure 'index.html' contains a div with id='root'."
  );
}

function renderApp() {
  createRoot(rootElement!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  );
}

function renderError(message: string) {
  createRoot(rootElement!).render(<ErrorScreen message={message} />);
}

// Uygulama başlatılırken hata kontrolü
try {
  const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const rapidApiHost = "exercisedb.p.rapidapi.com";
  const apiUrl = `https://${rapidApiHost}`;

  if (!rapidApiKey) {
    renderError("API anahtarı (VITE_RAPIDAPI_KEY) yapılandırılmamış.");
  } else {
    setApiConfig({
      apiUrl,
      rapidApiKey,
      rapidApiHost,
    });
    renderApp();
  }
} catch (error: unknown) {
  console.error("Başlatma hatası:", error);
  if (error instanceof Error) {
    renderError(error.message);
  } else {
    renderError("Bilinmeyen bir hata oluştu.");
  }
}
