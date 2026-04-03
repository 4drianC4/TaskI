import { prisma } from "@/lib/prisma";
import { toColumnDTO, ColumnDTO } from "@/src/services/column/service";

export async function getAllColumnsService(boardId: string): Promise<ColumnDTO[]> {
  const columns = await prisma.columns.findMany({
    where: { board_id: boardId, deleted_at: null },
    orderBy: { order: "asc" },
  });

  return columns.map(toColumnDTO);
}