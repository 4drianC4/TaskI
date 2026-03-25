import { prisma } from "@/lib/prisma";
import type { UserDTO } from "@/types/user";

import { toUserDTO } from "@/src/services/user/service";

export async function deleteUserService(id: number): Promise<UserDTO> {
  const user = await prisma.user.delete({
    where: { id },
  });

  return toUserDTO(user);
}
