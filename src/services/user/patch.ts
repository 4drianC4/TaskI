import { prisma } from "@/lib/prisma";
import type { UserDTO } from "@/types/user";

import { toUserDTO } from "@/src/services/user/service";

type UpdateUserInput = {
  email?: string;
  name?: string | null;
};

export async function patchUserService(
  id: number,
  input: UpdateUserInput,
): Promise<UserDTO> {
  const user = await prisma.user.update({
    where: { id },
    data: {
      email: input.email?.toLowerCase().trim(),
      name: input.name === undefined ? undefined : input.name?.trim() || null,
    },
  });

  return toUserDTO(user);
}
