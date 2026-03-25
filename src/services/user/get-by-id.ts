import { prisma } from "@/lib/prisma";
import type { UserDTO } from "@/types/user";

import { toUserDTO } from "@/src/services/user/service";

export async function getUserByIdService(id: number): Promise<UserDTO | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return null;
  }

  return toUserDTO(user);
}
