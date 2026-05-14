import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { createCommentSchema } from "@/schemas/comment.schema";
import { createCommentService } from "@/src/services/comment";

export async function createCommentController(req: NextRequest) {
    try {
        const body = await req.json();
        const payload = createCommentSchema.parse(body);
        const data = await createCommentService(payload);
        return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: "Payload inválido", details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json({ error: "Error al crear comment", details: String(error) }, { status: 500 });
    }
}
