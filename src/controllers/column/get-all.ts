import { NextResponse } from "next/server";
import { getAllColumnsService } from "@/src/services/column";
export async function getColumnsController(boardId: string) {
    try {
        const columns = await getAllColumnsService(boardId);
        return NextResponse.json({ data: columns }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "No se pudieron obtener las columnas" }, { status: 500 });
    }
}