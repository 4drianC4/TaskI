import { prisma } from "@/lib/prisma";

export async function getAllCommentsService(task_id: string) {
    return prisma.comments.findMany({
        where: { task_id, deleted_at: null },
        orderBy: { created_at: "desc" },
    });
}
