import { prisma } from "@/lib/prisma";
import type { SubtaskDTO } from "@/types/subtask";

import { toSubtaskDTO } from "@/src/services/subtask/service";

export async function getAllSubtasksByTaskIdService(taskId: string): Promise<SubtaskDTO[]> {
  const subtasks = await prisma.subtasks.findMany({
    where: { task_id: taskId, deleted_at: null },
    orderBy: { order: "asc" },
  });

  return subtasks.map(toSubtaskDTO);
}