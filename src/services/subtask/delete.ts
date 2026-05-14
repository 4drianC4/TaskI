import { prisma } from "@/lib/prisma";
import type { SubtaskDTO } from "@/types/subtask";

import { toSubtaskDTO } from "@/src/services/subtask/service";

export async function deleteSubtaskService(id: string): Promise<SubtaskDTO> {
  const existing = await prisma.subtasks.findFirst({
    where: { id, deleted_at: null },
  });

  if (!existing) {
    throw new Error("NOT_FOUND");
  }

  const subtask = await prisma.subtasks.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  return toSubtaskDTO(subtask);
}