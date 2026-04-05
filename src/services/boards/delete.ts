import { prisma } from "@/lib/prisma";
import type { BoardDTO } from "@/types/boards";
import { toBoardDTO } from "@/src/services/boards/service";

export async function deleteBoardService(id: string): Promise<BoardDTO> {
  const boardId = id.trim();
  const existingBoard = await prisma.boards.findFirst({
    where: {
      id: boardId,
      deleted_at: null,
    },
  });
  if (!existingBoard) {
    throw new Error("NOT_FOUND");
  }
  const now = new Date();
  const board = await prisma.boards.update({
    where: {
      id: boardId,
    },
    data: { updated_at: now, deleted_at: now },
  });
  return toBoardDTO(board);
}
