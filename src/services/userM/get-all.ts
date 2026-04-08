import { prisma } from "@/lib/prisma";

export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    where: {
      deleted_at: null
    },
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true
    }
  });

  return users;
};