import type { UserDTO } from "@/types/userM";

export type DbUser = {
  id: string;
  email: string;
  name: string | null;
  created_at: Date;
};

export function toUserDTO(user: DbUser): UserDTO {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.created_at.toISOString(),
  };
}