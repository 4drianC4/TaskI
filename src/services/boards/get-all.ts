import { prisma } from "@/lib/prisma";
import type { BoardDTO } from "@/types/boards";
import { toBoardDTO } from "@/src/services/boards/service";

export async function getAllByWorkspaceService(
  workspaceId: string,
): Promise<BoardDTO[]> {
  const normalizedWorkspaceId = workspaceId.trim();
  const allBoards = await prisma.boards.findMany({
    where: { workspace_id: normalizedWorkspaceId, deleted_at: null },//duda aqui xd
    orderBy: { created_at: "desc" }
  });
  return allBoards.map(toBoardDTO);
}
