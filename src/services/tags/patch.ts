import { prisma } from "@/lib/prisma";
import type { TagDTO, UpdateTagInput } from "@/types/tags";
import { normalizeUpdateTagInput, toTagDTO } from "@/src/services/tags/service";

export async function patchTagService(id: string, input: UpdateTagInput): Promise<TagDTO> {
  const payload = normalizeUpdateTagInput(input);

  const tag = await prisma.tags.update({
    where: { id },
    data: {
      ...(typeof payload.name === "string" ? { name: payload.name } : {}),
      ...(typeof payload.color === "string" ? { color: payload.color } : {}),
    },
  });

  return toTagDTO(tag);
}
