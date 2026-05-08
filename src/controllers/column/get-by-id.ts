import { NextResponse } from "next/server";
import { getColumnByIdService } from "@/src/services/column";
export async function getColumnByIdController(id: string) {
    try {
        const column = await getColumnByIdService(id);
        if (!column) {
            return NextResponse.json({ error: "Columna no encontrada" }, { status: 404 });
        }
        return NextResponse.json({ data: column }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "No se pudo obtener la columna" }, { status: 500 });
    }
}