export interface ApiConfig {
  apiUrl: string;
  rapidApiKey: string;
  rapidApiHost: string;
}

let config: ApiConfig | null = null;

export const setApiConfig = (conf: ApiConfig) => {
  config = conf;
};

export const getApiConfig = (): ApiConfig => {
  if (!config) {
    config = {
      apiUrl: "https://exercisedb.p.rapidapi.com",
      rapidApiKey: import.meta.env.VITE_RAPIDAPI_KEY as string,
      rapidApiHost: "exercisedb.p.rapidapi.com",
    };
  }
  return config;
};
