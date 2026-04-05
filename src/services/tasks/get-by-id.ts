import { prisma } from "@/lib/prisma";
import type { TaskDTO } from "@/types/task";
import { toTaskDTO } from "@/src/services/tasks/service";

export async function getTaskByIdService(id: number): Promise<TaskDTO | null> {
    const task = await prisma.task.findUnique({
        where: { id },
    });
    if (!task) return null;
    return toTaskDTO(task);
}