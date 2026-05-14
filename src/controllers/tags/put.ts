import { NextResponse } from "next/server";
import { replaceTagService } from "@/src/services/tags";

type ReplaceTagRequest = { name?: string; color?: string };

export async function putTagController(req: Request, id: string) {
  try {
    const tagId = id.trim();
    if (!tagId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body: ReplaceTagRequest = await req.json();

    const name = body.name;
    const color = body.color;

    if (!name || !color) {
      return NextResponse.json({ error: "name y color son requeridos" }, { status: 400 });
    }

    const tag = await replaceTagService(tagId, { name, color });
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al actualizar tag" }, { status: 500 });
  }
}
