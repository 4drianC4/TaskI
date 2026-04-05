import { prisma } from "@/lib/prisma";
import type { CreateTaskInput, TaskDTO } from "@/types/task";
import { normalizeCreateTaskInput, toTaskDTO } from "@/src/services/tasks/service";

export async function createTaskService(input: CreateTaskInput): Promise<TaskDTO> {
    const normalizedInput = normalizeCreateTaskInput(input);
    const task = await prisma.task.create({
        data: {
            title: normalizedInput.title,
            description: normalizedInput.description,
            status: normalizedInput.status,
            dueDate: normalizedInput.dueDate ? new Date(normalizedInput.dueDate) : null,
            userId: normalizedInput.userId,
        },
    });
    return toTaskDTO(task);
}