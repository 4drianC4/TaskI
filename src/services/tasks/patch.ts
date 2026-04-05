import { prisma } from "@/lib/prisma";
import type { TaskDTO } from "@/types/task";
import { toTaskDTO } from "@/src/services/tasks/service";

type UpdateTaskInput = {
    title?: string;
    description?: string | null;
    status?: string;
    dueDate?: string | null;
    userId?: number;
};

export async function patchTaskService(
    id: number,
    input: UpdateTaskInput,
): Promise<TaskDTO> {
    const data: any = {};
    if (input.title !== undefined) data.title = input.title.trim();
    if (input.description !== undefined) data.description = input.description?.trim() ?? null;
    if (input.status !== undefined) data.status = input.status.toLowerCase().trim();
    if (input.dueDate !== undefined) data.dueDate = input.dueDate ? new Date(input.dueDate) : null;
    if (input.userId !== undefined) data.userId = input.userId;

    const task = await prisma.task.update({
        where: { id },
        data,
    });
    return toTaskDTO(task);
}