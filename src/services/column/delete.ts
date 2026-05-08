import { prisma } from "@/lib/prisma";
import { toColumnDTO } from "@/src/services/column/service";
import { ColumnDTO } from "@/types/column";

export async function deleteColumnService(id: string): Promise<ColumnDTO> {
  const column = await prisma.columns.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  return toColumnDTO(column);
}