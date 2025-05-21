import type { ApiParams } from "@/hooks/use-query";

type PaginationParams = Pick<ApiParams, "limit" | "offset">;

export const exerciseKeys = {
  all: ["exercises"] as const,

  lists: () => [...exerciseKeys.all, "lists"] as const,

  list: (params?: PaginationParams) =>
    [...exerciseKeys.all, ...(params ? [params] : [])] as const,

  detail: (id: string) => [...exerciseKeys.all, "detail", id] as const,

  bodyParts: (params?: PaginationParams) =>
    [...exerciseKeys.all, "bodyParts", ...(params ? [params] : [])] as const,

  equipment: (params?: PaginationParams) =>
    [...exerciseKeys.all, "equipment", ...(params ? [params] : [])] as const,

  targets: (params?: PaginationParams) =>
    [...exerciseKeys.all, "targets", ...(params ? [params] : [])] as const,

  byBodyPart: (bodyPart: string, params?: PaginationParams) =>
    [
      ...exerciseKeys.all,
      "byBodyPart",
      bodyPart,
      ...(params ? [params] : []),
    ] as const,

  byEquipment: (equipment: string, params?: PaginationParams) =>
    [
      ...exerciseKeys.all,
      "byEquipment",
      equipment,
      ...(params ? [params] : []),
    ] as const,

  byTarget: (target: string, params?: PaginationParams) =>
    [
      ...exerciseKeys.all,
      "byTarget",
      target,
      ...(params ? [params] : []),
    ] as const,

  byName: (name: string, params?: PaginationParams) =>
    [...exerciseKeys.all, "byName", name, ...(params ? [params] : [])] as const,
};
