import { prisma } from "@/lib/prisma";
import type { BoardDTO, UpdateBoardInput } from "@/types/boards";
import { toBoardDTO } from "@/src/services/boards/service";

export async function replaceBoardService(
  id: string,
  input: UpdateBoardInput,
): Promise<BoardDTO> {
  const boardId = id.trim();
  const data: {
    name?: string;
    cover_color?: string | null;
    cover_image?: string | null;
    state?: UpdateBoardInput["state"];
    visibility?: UpdateBoardInput["visibility"];
  } = {};
  if (input.name !== undefined) {
    data.name = input.name.trim();
  }

  if (input.coverColor !== undefined) {
    data.cover_color = input.coverColor?.trim() || null;
  }

  if (input.coverImage !== undefined) {
    data.cover_image = input.coverImage?.trim() || null;
  }

  if (input.state !== undefined) {
    data.state = input.state;
  }

  if (input.visibility !== undefined) {
    data.visibility = input.visibility;
  }
  const existingBoard = await prisma.boards.findFirst({
    where: {
      id: boardId,
      deleted_at: null,
    },
  });

  if (!existingBoard) {
    throw new Error("NOT_FOUND");
  }
  const board = await prisma.boards.update({
    where: { id: boardId },
    data
  });
  return toBoardDTO(board);
}
