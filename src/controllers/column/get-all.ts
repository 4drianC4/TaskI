import { NextResponse } from "next/server";
import { getAllColumnsService } from "@/src/services/column";

export async function getColumnsController(boardId: string) {
    try {
        if (!boardId) return NextResponse.json({ error: "Board ID es requerido" }, { status: 400 });

        const columns = await getAllColumnsService(boardId);
        return NextResponse.json({ data: columns }, { status: 200 });
    } catch (error) {
        console.error("Error al obtener las columnas: ", error);

        return NextResponse.json({ error: "Error al obtener las columnas" }, { status: 500 });
    }
}
