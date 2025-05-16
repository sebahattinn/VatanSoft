import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query.ts";
import { setApiConfig } from "./api/config";

// API konfigürasyonunu ayarla
setApiConfig({
  apiUrl: "https://exercisedb.p.rapidapi.com",
  rapidApiKey: import.meta.env.VITE_RAPIDAPI_KEY,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
