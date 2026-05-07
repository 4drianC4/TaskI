import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface CreateCommentData {
    task_id: string;
    user_id: string;
    content: string;
}

export async function createCommentService(data: CreateCommentData) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const comment = await tx.comments.create({ data });
        await tx.activityLogs.create({
            data: {
                task_id: data.task_id,
                user_id: data.user_id,
                action: "comment_added",
            },
        });
        return comment;
    });
}
