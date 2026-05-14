import { NextResponse } from "next/server";
import { createTagService } from "@/src/services/tags";
import type { CreateTagInput } from "@/types/tags";

type CreateTagRequest = CreateTagInput & { workspace_id?: string; workspaceId?: string };

export async function createTagController(req: Request) {
  try {
    const body: CreateTagRequest = await req.json();

    const workspaceId = body.workspace_id ?? body.workspaceId;
    const name = body.name;
    const color = body.color;

    if (!workspaceId || !name || !color) {
      return NextResponse.json(
        { error: "workspace_id, name y color son requeridos" },
        { status: 400 }
      );
    }

    const tag = await createTagService({ workspace_id: workspaceId, name, color });
    return NextResponse.json({ data: tag }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear tag" }, { status: 500 });
  }
}
