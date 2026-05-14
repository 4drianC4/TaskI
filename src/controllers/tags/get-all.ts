import { NextResponse } from "next/server";
import { getAllTagsService } from "@/src/services/tags";

export async function getAllTagsController(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId") ?? searchParams.get("workspace_id") ?? undefined;

    const tags = await getAllTagsService(workspaceId?.trim() || undefined);
    return NextResponse.json({ data: tags }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener tags" }, { status: 500 });
  }
}
