import { NextResponse } from "next/server";
import { getAllByWorkspaceService } from "@/src/services/boards";

export async function getBoardsController(req: Request) {
  try {
    const url = new URL(req.url);
    const workspaceId = url.searchParams.get("workspace_id")?.trim();

    if (!workspaceId) {
      return NextResponse.json(
        { error: "workspace_id is required" },
        { status: 400 },
      );
    }

    const boards = await getAllByWorkspaceService(workspaceId);
    return NextResponse.json({ data: boards }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 },
    );
  }
}
