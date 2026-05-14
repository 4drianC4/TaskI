import { prisma } from "@/lib/prisma";
import type { TagDTO } from "@/types/tags";
import { normalizeCreateTagInput, toTagDTO, type CreateTagPayload } from "@/src/services/tags/service";

export async function createTagService(input: CreateTagPayload): Promise<TagDTO> {
  const payload = normalizeCreateTagInput(input);

  const tag = await prisma.tags.create({
    data: {
      workspace_id: payload.workspace_id,
      name: payload.name,
      color: payload.color,
    },
  });

  return toTagDTO(tag);
}
