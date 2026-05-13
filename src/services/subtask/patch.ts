import { prisma } from "@/lib/prisma";
import type { SubtaskDTO, UpdateSubtaskInput } from "@/types/subtask";

import { toSubtaskDTO } from "@/src/services/subtask/service";

export async function patchSubtaskService(id: string, input: UpdateSubtaskInput): Promise<SubtaskDTO> {
  const subtask = await prisma.subtask.update({
    where: { id },
    data: {
      title: input.title,
      order: input.order,
      is_completed: input.isCompleted,
    },
  });

  return toSubtaskDTO(subtask);
}