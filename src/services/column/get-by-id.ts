import { prisma } from "@/lib/prisma";
import { toColumnDTO, ColumnDTO } from "@/src/services/column/service";

export async function getColumnByIdService(id: string): Promise<ColumnDTO | null> {
  const column = await prisma.columns.findFirst({
    where: { id, deleted_at: null },
  });

  if (!column) return null;

  return toColumnDTO(column);
}