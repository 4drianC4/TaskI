import { NextResponse } from "next/server";
import { patchTagService } from "@/src/services/tags";
import type { UpdateTagInput } from "@/types/tags";

export async function patchTagController(req: Request, id: string) {
  try {
    const tagId = id.trim();
    if (!tagId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body: UpdateTagInput = await req.json();
    const name = body.name;
    const color = body.color;

    if (!name && !color) {
      return NextResponse.json(
        { error: "Debe enviar al menos name o color" },
        { status: 400 }
      );
    }

    const tag = await patchTagService(tagId, body);
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al actualizar parcialmente tag" }, { status: 500 });
  }
}
