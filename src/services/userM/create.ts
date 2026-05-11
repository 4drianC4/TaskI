import { prisma } from "@/lib/prisma";
import type { CreateUserInput, UserDTO } from "@/types/userM";
import { toUserDTO } from "@/src/services/userM/service";

export const createUser = async (data: CreateUserInput):
 Promise<UserDTO> => {
  const existe = await prisma.users.findUnique({
    where: { email: data.email },
  });

  if (existe) {
    throw new Error("El email ya existe");
  }
  const user = await prisma.users.create({
    data: {
      email: data.email,
      name: data.name,
      system_role_id: data.systemRoleId,
    },
  });
  return toUserDTO(user);
};