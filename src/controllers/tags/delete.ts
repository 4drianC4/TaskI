import { NextResponse } from "next/server";
import { deleteTagService } from "@/src/services/tags";

export async function deleteTagController(id: string) {
  try {
    const tagId = id.trim();
    if (!tagId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const tag = await deleteTagService(tagId);
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al eliminar tag" }, { status: 500 });
  }
}
