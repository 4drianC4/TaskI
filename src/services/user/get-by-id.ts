import { prisma } from "@/lib/prisma";
import type { UserDTO } from "@/types/userM";
import { toUserDTO } from "@/src/services/user/service";

export const getUserById = async (id: string): 
Promise<UserDTO> => {
  const user = await prisma.users.findUnique({
    where: { id },
  });

  if (!user || user.deleted_at) {
    throw new Error("Usuario no encontrado");
  }
  return toUserDTO(user);
};