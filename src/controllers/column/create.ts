import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createColumnSchema } from "@/schemas/column.schema";
import { createColumnService } from "@/src/services/column";
export async function postColumnController(req: Request) {
    try {
        const body = await req.json();
        const payload = createColumnSchema.parse(body);
        const column = await createColumnService(payload);
        return NextResponse.json({ data: column }, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Payload inválido", details: error.flatten() }, { status: 400 });
        }
        return NextResponse.json({ error: "No se pudo crear la columna" }, { status: 500 });
    }
}