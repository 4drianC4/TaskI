import { prisma } from "@/lib/prisma";
import { toColumnDTO } from "@/src/services/column/service";
import { ColumnDTO, CreateColumnInput } from "@/types/column";
import { randomUUID } from "crypto";

export async function createColumnService(input: CreateColumnInput): Promise<ColumnDTO> {
  const column = await prisma.columns.create({
    data: {
      id: randomUUID(),
      board_id: input.board_id,
      name: input.name,
      order: input.order,
    },
  });

  return toColumnDTO(column);
}