import { NextResponse } from "next/server";
import { deleteSubtaskService } from "@/src/services/subtask";

export async function deleteSubtaskController(id: string) {
  try {
    const subtaskId = id.trim();
    if (!subtaskId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const deleted = await deleteSubtaskService(subtaskId);
    return NextResponse.json({ data: deleted }, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
    return NextResponse.json({ error: "Failed to delete subtask" }, { status: 500 });
  }
}
