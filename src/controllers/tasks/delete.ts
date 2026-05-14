import { NextResponse } from "next/server";
import { deleteTask } from "@/src/services/tasks";

export async function deleteTaskController(id: string) {
    await deleteTask(id);
    return NextResponse.json({ message: "Task eliminada" });
}