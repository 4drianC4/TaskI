import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface UpdateCommentData {
    content: string;
    user_id: string;
    task_id: string;
}

function isNotFound(error: unknown): boolean {
    return error instanceof Error && (error as { code?: string }).code === "P2025";
}

export async function updateCommentService(id: string, data: UpdateCommentData) {
    try {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const comment = await tx.comments.update({
                where: { id },
                data: { content: data.content },
            });
            await tx.activityLogs.create({
                data: {
                    task_id: data.task_id,
                    user_id: data.user_id,
                    action: "comment_updated",
                },
            });
            return comment;
        });
    } catch (error) {
        if (isNotFound(error)) return null;
        throw error;
    }
}
