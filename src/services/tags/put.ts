import { prisma } from "@/lib/prisma";
import type { TagDTO } from "@/types/tags";
import { toTagDTO } from "@/src/services/tags/service";

type ReplaceTagInput = {
  name: string;
  color: string;
};

export async function replaceTagService(id: string, input: ReplaceTagInput): Promise<TagDTO> {
  const payload = {
    name: input.name.trim(),
    color: input.color.trim(),
  };

  const tag = await prisma.tags.update({
    where: { id },
    data: {
      name: payload.name,
      color: payload.color,
    },
  });

  return toTagDTO(tag);
}
