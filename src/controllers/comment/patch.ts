import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { updateCommentSchema } from "@/schemas/comment.schema";
import { updateCommentService } from "@/src/services/comment";

export async function updateCommentController(req: NextRequest, id: string) {
    try {
        const body = await req.json();
        const payload = updateCommentSchema.parse(body);
        const data = await updateCommentService(id, payload);
        if (!data) return NextResponse.json({ error: "Comment no encontrado" }, { status: 404 });
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: "Payload inválido", details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json({ error: "Error al actualizar comment" }, { status: 500 });
    }
}
