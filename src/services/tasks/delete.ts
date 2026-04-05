import { prisma } from "@/lib/prisma";
import type { TaskDTO } from "@/types/task";
import { toTaskDTO } from "@/src/services/tasks/service";

export async function deleteTaskService(id: number): Promise<TaskDTO> {
    const task = await prisma.task.delete({
        where: { id },
    });
    return toTaskDTO(task);
}