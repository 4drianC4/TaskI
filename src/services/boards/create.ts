import { prisma } from "@/lib/prisma";
import type { BoardDTO, CreateBoardInput } from "@/types/boards";
import {
  normalizeCreateBoardInput,
  toBoardDTO,
} from "@/src/services/boards/service";

export async function createBoardService(
  input: CreateBoardInput,
): Promise<BoardDTO> {
  const normalizedInput = normalizeCreateBoardInput(input);
  const board = await prisma.boards.create({
    data: {
      workspace_id: normalizedInput.workspaceId,
      name: normalizedInput.name,
      cover_color: normalizedInput.coverColor ?? null,
      cover_image: normalizedInput.coverImage ?? null,
      state: normalizedInput.state ?? null,
      visibility: normalizedInput.visibility ?? null,
    },
  });
  return toBoardDTO(board);
}
