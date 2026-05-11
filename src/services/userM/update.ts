import { prisma } from "@/lib/prisma";
import type { UpdateUserInput, UserDTO } from "@/types/userM";
import { toUserDTO } from "@/src/services/userM/service";

export const updateUser = async (id: string,data: UpdateUserInput):
 Promise<UserDTO> => {
  const existe = await prisma.users.findFirst({
    where: {
      id,
      deleted_at: null,
    },
  });
  if (!existe) {
    throw new Error("Usuario no encontrado");
  }
  const user = await prisma.users.update({
    where: { id },
    data,
  });
  return toUserDTO(user);
};