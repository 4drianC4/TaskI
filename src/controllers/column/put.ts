import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { putColumnService } from "@/src/services/column";
import { putColumnSchema } from "@/schemas/column.schema";

export async function putColumnController(req: Request, id: string) {
    try {
        const body = await req.json();
        const payload = putColumnSchema.parse(body);
        const column = await putColumnService(id, payload);
        return NextResponse.json({ data: column }, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) return NextResponse.json({ error: "Payload inválido", details: error.flatten() }, { status: 400 });

        return NextResponse.json({ error: "Error al actualizar la columna" }, { status: 500 });
    }
}
