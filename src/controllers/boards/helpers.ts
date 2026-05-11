import type { BoardState, BoardVisibility } from "@/types/boards";

export function isObjectRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isBoardState(value: unknown): value is BoardState {
  return value === "active" || value === "inactive" || value === "finished";
}

export function isBoardVisibility(value: unknown): value is BoardVisibility {
  return value === "private" || value === "workspace" || value === "public";
}

export function isNotFoundBoardError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message === "NOT_FOUND_BOARD" || error.message === "NOT_FOUND")
  );
}
