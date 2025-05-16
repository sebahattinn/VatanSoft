import { useQueryWithData, useMutationWithData } from "@/hooks/use-query";
import { type PaginatedResponse } from "@/api/responses/PaginatedResponse";

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

// Kullanıcı listesini getiren hook
export function useUsers(page: number, pageSize: number) {
  return useQueryWithData<PaginatedResponse<User>>(
    ["users", page.toString()],
    "/users",
    true,
    { page, pageSize }
  );
}

// Tekil kullanıcı getiren hook
export function useUser(id: number) {
  return useQueryWithData<User>(["user", id.toString()], `/users/${id}`);
}

// Yeni kullanıcı oluşturan hook
export function useCreateUser() {
  return useMutationWithData<User, CreateUserDto>("/users");
}

// Kullanıcı güncelleyen hook
export function useUpdateUser(id: number) {
  return useMutationWithData<User, Partial<CreateUserDto>>(
    `/users/${id}`,
    "put"
  );
}

// Kullanıcı silen hook
export function useDeleteUser() {
  return useMutationWithData<void, number>("/users", "delete");
}
