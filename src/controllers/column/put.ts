import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { putColumnService } from "@/src/services/column";

export async function putColumnController(req: Request, id: string) {
    try {
        const body = await req.json();
        const column = await putColumnService(id, body);
        return NextResponse.json({ data: column }, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Payload inválido", details: error.flatten() }, { status: 400 });
        }
        return NextResponse.json({ error: "No se encontró la columna o el tablero" }, { status: 404 });
    }
}
