import { prisma } from "@/lib/prisma";
import type { UserDTO } from "@/types/userM";
import { toUserDTO } from "@/src/services/userM/service";

export const deleteUser = async (id: string):
Promise<UserDTO> => {
  const existingUser = await prisma.users.findFirst({
    where: {
      id,
      deleted_at: null,
    },
  });
  if (!existingUser) {
    throw new Error("Usuario no encontrado");
  }
  const user = await prisma.users.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
  return toUserDTO(user);
};