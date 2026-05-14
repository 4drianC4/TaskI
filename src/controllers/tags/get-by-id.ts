import { NextResponse } from "next/server";
import { getTagByIdService } from "@/src/services/tags";

export async function getTagController(_: Request, id: string) {
  try {
    const tagId = id.trim();
    if (!tagId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const tag = await getTagByIdService(tagId);
    if (!tag) {
      return NextResponse.json({ error: "Tag no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ data: tag }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al obtener tag" }, { status: 500 });
  }
}
