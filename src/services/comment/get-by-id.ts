import { prisma } from "@/lib/prisma";

export async function getCommentByIdService(id: string) {
    return prisma.comments.findFirst({
        where: { id, deleted_at: null },
    });
}
