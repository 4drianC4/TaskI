import { prisma } from "@/lib/prisma";
import type { TagDTO } from "@/types/tags";
import { toTagDTO } from "@/src/services/tags/service";

export async function getTagByIdService(id: string): Promise<TagDTO | null> {
  const tag = await prisma.tags.findFirst({
    where: { id, deleted_at: null },
  });

  if (!tag) {
    return null;
  }

  return toTagDTO(tag);
}
