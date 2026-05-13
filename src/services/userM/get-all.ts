import { prisma } from "@/lib/prisma";
import type { UserDTO } from "@/types/userM";
import { toUserDTO } from "@/src/services/userM/service";

export const getAllUsers = async (): 
Promise<UserDTO[]> => {
  const users = await prisma.users.findMany({
    where: {
      deleted_at: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true,
    },
  });
  return users.map(toUserDTO);
};