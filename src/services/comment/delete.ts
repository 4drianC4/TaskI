import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

function isNotFound(error: unknown): boolean {
    return error instanceof Error && (error as { code?: string }).code === "P2025";
}

export async function deleteCommentService(id: string) {
    try {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const existing = await tx.comments.findFirst({ where: { id, deleted_at: null } });
            if (!existing) return null;

            const comment = await tx.comments.update({
                where: { id },
                data: { deleted_at: new Date() },
            });
            await tx.activityLogs.create({
                data: {
                    task_id: existing.task_id,
                    user_id: existing.user_id,
                    action: "comment_deleted",
                },
            });
            return comment;
        });
    } catch (error) {
        if (isNotFound(error)) return null;
        throw error;
    }
}
