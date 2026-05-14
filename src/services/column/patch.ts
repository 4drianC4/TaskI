import { prisma } from "@/lib/prisma";
import { toColumnDTO } from "@/src/services/column/service";
import { ColumnDTO, PatchColumnInput } from "@/types/column";

export async function patchColumnService(id: string, input: PatchColumnInput): Promise<ColumnDTO> {
  const column = await prisma.columns.update({
    where: { id },
    data: {
      name: input.name?.trim(),
      order: input.order,
      is_done: input.is_done,
    },
  });

  return toColumnDTO(column);
}