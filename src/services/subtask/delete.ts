import { prisma } from "@/lib/prisma";
import type { SubtaskDTO } from "@/types/subtask";

import { toSubtaskDTO } from "@/src/services/subtask/service";

export async function deleteSubtaskService(id: string): Promise<SubtaskDTO> {
  const subtask = await prisma.subtask.delete({
    where: { id },
  });

  return toSubtaskDTO(subtask);
}