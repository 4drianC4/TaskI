import { prisma } from "@/lib/prisma";
import type { TaskDTO } from "@/types/task";
import { toTaskDTO } from "@/src/services/tasks/service";

export async function getAllTasksService(): Promise<TaskDTO[]> {
    const tasks = await prisma.task.findMany({
        orderBy: { createdAt: "desc" },
    });
    return tasks.map(toTaskDTO);
}