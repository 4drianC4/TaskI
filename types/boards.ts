export type BoardState = "active" | "inactive" | "finished";

export type BoardVisibility = "private" | "workspace" | "public";

export type BoardDTO = {
  id: string;
  workspaceId: string;
  name: string;
  coverColor: string | null;
  coverImage: string | null;
  state: BoardState | null;
  visibility: BoardVisibility | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type CreateBoardInput = {
  workspaceId: string;
  name: string;
  coverColor?: string;
  coverImage?: string;
  state?: BoardState;
  visibility?: BoardVisibility;
};

export type UpdateBoardInput = {
  name?: string;
  coverColor?: string | null;
  coverImage?: string | null;
  state?: BoardState | null;
  visibility?: BoardVisibility | null;
};
