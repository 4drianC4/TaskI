import type { CreateUserInput, UserDTO } from "@/types/user";

export type DbUser = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
};

export function toUserDTO(user: DbUser): UserDTO {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
  };
}

export function normalizeCreateUserInput(input: CreateUserInput): CreateUserInput {
  return {
    ...input,
    email: input.email.toLowerCase().trim(),
    name: input.name?.trim() || undefined,
  };
}
