import { prisma } from "@/lib/prisma";
import type { TaskDTO } from "@/types/task";
import { toTaskDTO } from "@/src/services/tasks/service";

type ReplaceTaskInput = {
    title: string;
    description: string | null;
    status: string;
    dueDate: string | null;
    userId: number;
};

export async function replaceTaskService(
    id: number,
    input: ReplaceTaskInput,
): Promise<TaskDTO> {
    const task = await prisma.task.update({
        where: { id },
        data: {
            title: input.title.trim(),
            description: input.description?.trim() ?? null,
            status: input.status.toLowerCase().trim(),
            dueDate: input.dueDate ? new Date(input.dueDate) : null,
            userId: input.userId,
        },
    });
    return toTaskDTO(task);
}