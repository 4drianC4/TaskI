import { apiClient } from "@/lib/api-client";
import type { CreateUserInput, UserDTO } from "@/types/user";

type UsersResponse = {
  data: UserDTO[];
};

type UserResponse = {
  data: UserDTO;
};

export async function fetchUsers(): Promise<UserDTO[]> {
  const response = await apiClient<UsersResponse>("/api/users", {
    method: "GET",
    cache: "no-store",
  });

  return response.data;
}

export async function createUser(input: CreateUserInput): Promise<UserDTO> {
  const response = await apiClient<UserResponse>("/api/users", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return response.data;
}
