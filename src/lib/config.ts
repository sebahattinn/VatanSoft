export interface ApiConfig {
  baseUrl: string;
  rapidApiKey: string;
  rapidApiHost: string;
}

export const getApiConfig = (): ApiConfig => ({
  baseUrl: "https://exercisedb.p.rapidapi.com",
  rapidApiKey: import.meta.env.VITE_RAPIDAPI_KEY as string,
  rapidApiHost: "exercisedb.p.rapidapi.com",
});
