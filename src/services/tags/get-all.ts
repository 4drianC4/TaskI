import { prisma } from "@/lib/prisma";
import type { TagDTO } from "@/types/tags";
import { toTagDTO } from "@/src/services/tags/service";

export async function getAllTagsService(workspaceId?: string): Promise<TagDTO[]> {
  const tags = await prisma.tags.findMany({
    where: {
      deleted_at: null,
      ...(workspaceId ? { workspace_id: workspaceId } : {}),
    },
    orderBy: { name: "asc" },
  });

  return tags.map(toTagDTO);
}
