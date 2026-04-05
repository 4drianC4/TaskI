import { prisma } from "@/lib/prisma";
import type { CreateUserInput, UserDTO } from "@/types/user";

import { normalizeCreateUserInput, toUserDTO } from "@/src/services/user/service";

export async function createUserService(input: CreateUserInput): Promise<UserDTO> {
  const normalizedInput = normalizeCreateUserInput(input);

  const user = await prisma.user.create({
    data: {
      email: normalizedInput.email,
      name: normalizedInput.name,
    },
  });

  return toUserDTO(user);
}
