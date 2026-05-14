import { NextResponse } from "next/server";
import { getById } from "@/src/services/tasks";

export async function getTaskByIdController(id: string) {
    const task = await getById(id);
    if (!task) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(task);
}