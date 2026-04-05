import type { CreateTaskInput, TaskDTO } from "@/types/task";

export type DbTask = {
    id: number;
    title: string;
    description: string | null;
    status: string;
    dueDate: Date | null;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export function toTaskDTO(task: DbTask): TaskDTO {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate?.toISOString() ?? null,
        userId: task.userId,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
    };
}

export function normalizeCreateTaskInput(input: CreateTaskInput): CreateTaskInput {
    return {
        ...input,
        title: input.title.trim(),
        description: input.description?.trim() ?? null,
        status: input.status?.toLowerCase().trim() ?? "pending",
        // dueDate ya viene como string ISO o null, no se normaliza más
    };
}