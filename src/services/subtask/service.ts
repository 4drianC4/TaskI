import type { CreateSubtaskInput, SubtaskDTO } from "@/types/subtask";

export type DbSubtask = {
  id: string;
  task_id: string;
  title: string;
  order: number;
  is_completed: boolean;
  created_at: Date;
  deleted_at: Date | null;
};

export function toSubtaskDTO(subtask: DbSubtask): SubtaskDTO {
  return {
    id: subtask.id,
    taskId: subtask.task_id,
    title: subtask.title,
    order: subtask.order,
    isCompleted: subtask.is_completed,
    createdAt: subtask.created_at.toISOString(),
    deletedAt: subtask.deleted_at ? subtask.deleted_at.toISOString() : null,
  };
}

export function normalizeCreateSubtaskInput(
  input: CreateSubtaskInput,
): CreateSubtaskInput {
  return {
    ...input,
    taskId: input.taskId.trim(),
    title: input.title.trim(),
    order: Number(input.order),
    isCompleted: Boolean(input.isCompleted),
  };
}