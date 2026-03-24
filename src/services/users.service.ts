import { prisma } from "@/lib/prisma";
import type { CreateUserInput, UserDTO } from "@/types/user";

function toUserDTO(user: {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}): UserDTO {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function listUsersService(): Promise<UserDTO[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users.map(toUserDTO);
}

export async function createUserService(input: CreateUserInput): Promise<UserDTO> {
  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      name: input.name,
    },
  });

  return toUserDTO(user);
}
