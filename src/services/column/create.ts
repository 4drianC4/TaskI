import { prisma } from "@/lib/prisma";
import { toColumnDTO, ColumnDTO } from "@/src/services/column/service";

type CreateColumnInput = {
  board_id: string;
  name: string;
  order: number;
};

export async function createColumnService(input: CreateColumnInput): Promise<ColumnDTO> {
  const column = await prisma.columns.create({
    data: {
      board_id: input.board_id,
      name: input.name.trim(),
      order: input.order,
    },
  });

  return toColumnDTO(column);
}