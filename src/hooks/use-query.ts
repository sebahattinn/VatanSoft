import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import api from "@/api/axios";

export interface ApiParams {
  page?: number;
  pageSize?: number;
  [key: string]: string | number | boolean | undefined;
}

// Genel sorgu hook'u
export function useQueryWithData<T>(
  key: readonly unknown[],
  url: string,
  enabled = true,
  params?: ApiParams,
  options?: Partial<UseQueryOptions<T, Error, T>>
): UseQueryResult<T, Error> {
  return useQuery<T, Error, T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<T>(url, { params });
      return data;
    },
    enabled,
    ...options,
  });
}
