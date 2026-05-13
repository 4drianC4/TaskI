import { prisma } from "@/lib/prisma";
import type { CreateSubtaskInput, SubtaskDTO } from "@/types/subtask";

import { normalizeCreateSubtaskInput, toSubtaskDTO } from "@/src/services/subtask/service";

export async function createSubtaskService(input: CreateSubtaskInput): Promise<SubtaskDTO> {
  const normalizedInput = normalizeCreateSubtaskInput(input);

  const subtask = await prisma.subtask.create({
	data: {
	  title: normalizedInput.title,
	  task_id: normalizedInput.taskId,
	  order: normalizedInput.order,
	  is_completed: normalizedInput.isCompleted,
	},
  });

  return toSubtaskDTO(subtask);
}