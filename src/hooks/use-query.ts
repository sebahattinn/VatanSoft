import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/api/axios";

// API parametre tipleri
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

// Genel mutasyon hook'u
export function useMutationWithData<T, U = unknown>(
  url: string,
  method: "post" | "put" | "patch" | "delete" = "post",
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError) => void;
  }
): UseMutationResult<T, AxiosError, U> {
  return useMutation<T, AxiosError, U>({
    mutationFn: async (variables: U) => {
      const { data } = await api[method]<T>(url, variables);
      return data;
    },
    ...options,
  });
}
// Sayfalama için özel hook
export function usePaginatedQuery<T>(
  key: string[],
  url: string,
  page: number,
  pageSize: number,
  enabled = true
): UseQueryResult<T, Error> {
  return useQuery<T, Error, T>({
    queryKey: [...key, page, pageSize],
    queryFn: async () => {
      const { data } = await api.get<T>(url, {
        params: {
          page,
          pageSize,
        },
      });
      return data;
    },
    enabled,
  });
}
// Sonsuz sayfalama için özel hook
export function useInfiniteQuery<T>(
  key: string[],
  url: string,
  pageSize: number,
  enabled = true
) {
  return useQuery({
    queryKey: key,
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get<T>(url, {
        params: {
          page: pageParam,
          pageSize,
        },
      });
      return data;
    },
    enabled,
  });
}
