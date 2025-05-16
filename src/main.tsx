import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query.ts";
import { setApiConfig } from "./api/config";
import { Toaster } from "sonner";

// Check if the API key is available
const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
if (!rapidApiKey) {
  throw new Error("VITE_RAPIDAPI_KEY is not set in .env file");
}

// Set API configuration
setApiConfig({
  apiUrl: "https://exercisedb.p.rapidapi.com",
  rapidApiKey: rapidApiKey,
  rapidApiHost: "exercisedb.p.rapidapi.com"
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
