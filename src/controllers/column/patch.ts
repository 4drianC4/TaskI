import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { patchColumnSchema } from "@/schemas/column.schema";
import { patchColumnService } from "@/src/services/column";
export async function patchColumnController(req: Request, id: string) {
    try {
        const body = await req.json();
        const payload = patchColumnSchema.parse(body);
        const column = await patchColumnService(id, payload);
        return NextResponse.json({ data: column }, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) return NextResponse.json({ error: "Payload inválido", details: error.flatten() }, { status: 400 });
        return NextResponse.json({ error: "No se pudo actualizar la columna" }, { status: 500 });
    }
}