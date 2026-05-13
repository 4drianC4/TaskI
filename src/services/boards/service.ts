import type {
  BoardDTO,
  BoardState,
  BoardVisibility,
  CreateBoardInput,
} from "@/types/boards";

export type DbBoard = {
  id: string;
  workspace_id: string;
  name: string;
  cover_color: string | null;
  cover_image: string | null;
  state: BoardState | null;
  visibility: BoardVisibility | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export function toBoardDTO(board: DbBoard): BoardDTO {
  return {
    id: board.id,
    workspaceId: board.workspace_id,
    name: board.name,
    coverColor: board.cover_color,
    coverImage: board.cover_image,
    state: board.state,
    visibility: board.visibility,
    createdAt: board.created_at.toISOString(),
    updatedAt: board.updated_at ? board.updated_at.toISOString() : null,
    deletedAt: board.deleted_at ? board.deleted_at.toISOString() : null,
  };
}

export function normalizeCreateBoardInput(
  input: CreateBoardInput,
): CreateBoardInput {
  return {
    ...input,
    workspaceId: input.workspaceId.trim(),
    name: input.name.trim(),
    coverColor: input.coverColor?.trim() || undefined,
    coverImage: input.coverImage?.trim() || undefined,
  };
}
