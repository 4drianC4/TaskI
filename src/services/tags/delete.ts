import { prisma } from "@/lib/prisma";
import type { TagDTO } from "@/types/tags";
import { toTagDTO } from "@/src/services/tags/service";

export async function deleteTagService(id: string): Promise<TagDTO> {
  const tag = await prisma.tags.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  return toTagDTO(tag);
}
