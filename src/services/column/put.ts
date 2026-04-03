import { prisma } from "@/lib/prisma";
import { toColumnDTO, ColumnDTO } from "@/src/services/column/service";

type PutColumnInput = {
  board_id: string;
  name: string;
  order: number;
  is_done: boolean;
};

export async function putColumnService(id: string, input: PutColumnInput): Promise<ColumnDTO> {
  const column = await prisma.columns.update({
    where: { id },
    data: {
      board_id: input.board_id,
      name: input.name.trim(),
      order: input.order,
      is_done: input.is_done,
    },
  });

  return toColumnDTO(column);
}