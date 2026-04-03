import { prisma } from "@/lib/prisma";
import { toColumnDTO, ColumnDTO } from "@/src/services/column/service";

type PatchColumnInput = {
  name?: string;
  order?: number;
  is_done?: boolean;
};

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