import { NextResponse } from "next/server";
import { deleteColumnService } from "@/src/services/column";
export async function deleteColumnController(id: string) {
    try {
        const column = await deleteColumnService(id);
        return NextResponse.json({ data: column }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "No se pudo eliminar la columna" }, { status: 500 });
    }
}