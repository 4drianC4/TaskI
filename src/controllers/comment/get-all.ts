import { NextRequest, NextResponse } from "next/server";
import { getAllCommentsService } from "@/src/services/comment";

export async function getAllCommentsController(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const taskId = url.searchParams.get("task_id")?.trim();

        if (!taskId) {
            return NextResponse.json({ error: "task_id es requerido" }, { status: 400 });
        }

        const data = await getAllCommentsService(taskId);
        return NextResponse.json({ data }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Error al obtener comments" }, { status: 500 });
    }
}
