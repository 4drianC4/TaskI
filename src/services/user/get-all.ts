import { prisma } from "@/lib/prisma";
import type { UserDTO } from "@/types/user";

import { toUserDTO } from "@/src/services/user/service";

export async function getAllUsersService(): Promise<UserDTO[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users.map(toUserDTO);
}
