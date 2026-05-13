import { prisma } from "@/lib/prisma";
import type { SubtaskDTO } from "@/types/subtask";

import { toSubtaskDTO } from "@/src/services/subtask/service";

export async function getSubtaskByIdService(id: string): Promise<SubtaskDTO | null> {
  const subtask = await prisma.subtask.findUnique({
    where: { id },
  });

  if (!subtask) {
    return null;
  }

  return toSubtaskDTO(subtask);
}