import { NextResponse } from "next/server";
import { deleteCommentService } from "@/src/services/comment";

export async function deleteCommentController(id: string) {
    try {
        const data = await deleteCommentService(id);
        if (!data) return NextResponse.json({ error: "Comment no encontrado" }, { status: 404 });
        return NextResponse.json({ message: "Comentario eliminado", data }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Error al eliminar comment" }, { status: 500 });
    }
}
