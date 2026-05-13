import { prisma } from "@/lib/prisma";
import type { SubtaskDTO, UpdateSubtaskInput } from "@/types/subtask";
import { toSubtaskDTO } from "@/src/services/subtask/service";

export async function replaceSubtaskService(
  id: string,
  input: UpdateSubtaskInput,
): Promise<SubtaskDTO> {
  const subtaskId = id.trim();
  const existing = await prisma.subtasks.findFirst({
    where: { id: subtaskId, deleted_at: null },
  });

  if (!existing) {
    throw new Error("NOT_FOUND");
  }

  const data: {
    title?: string;
    order?: number;
    is_completed?: boolean;
  } = {};

  if (input.title !== undefined) data.title = input.title.trim();
  if (input.order !== undefined) data.order = Number(input.order);
  if (input.isCompleted !== undefined) data.is_completed = input.isCompleted;

  if (Object.keys(data).length === 0) {
    throw new Error("NO_FIELDS");
  }

  const updated = await prisma.subtasks.update({ where: { id: subtaskId }, data });
  return toSubtaskDTO(updated);
}
