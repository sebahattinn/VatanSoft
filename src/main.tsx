import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import App from "@/App.tsx";
import { queryClient } from "@/lib/react-query.ts";
import { setApiConfig } from "@/api/config";
import ErrorScreen from "@/components/ErrorScreen";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

function renderApp() {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  );
}

function renderError(message: string) {
  root.render(<ErrorScreen message={message} />);
}

function getApiConfig() {
  const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const rapidApiHost = "exercisedb.p.rapidapi.com";

  if (!rapidApiKey) {
    throw new Error("API anahtarı (VITE_RAPIDAPI_KEY) tanımlı değil.");
  }

  return {
    apiUrl: `https://${rapidApiHost}`,
    rapidApiKey,
    rapidApiHost,
  };
}

try {
  const apiConfig = getApiConfig();
  setApiConfig(apiConfig);
  renderApp();
} catch (error: unknown) {
  console.error("Başlatma hatası:", error);
  const message =
    error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.";
  renderError(message);
}
