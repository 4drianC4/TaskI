import { NextResponse } from "next/server";
import { getCommentByIdService } from "@/src/services/comment";

export async function getCommentByIdController(id: string) {
    try {
        const data = await getCommentByIdService(id);
        if (!data) return NextResponse.json({ error: "Comment no encontrado" }, { status: 404 });
        return NextResponse.json({ data }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Error al obtener comment" }, { status: 500 });
    }
}
