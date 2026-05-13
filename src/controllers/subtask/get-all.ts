import { NextResponse } from "next/server";
import { getAllSubtasksByTaskIdService } from "@/src/services/subtask";

export async function getAllSubtasksController(req: Request) {
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get("task_id")?.trim();

    if (!taskId) {
      return NextResponse.json({ error: "task_id is required" }, { status: 400 });
    }

    const subtasks = await getAllSubtasksByTaskIdService(taskId);
    return NextResponse.json({ data: subtasks }, { status: 200 });
  } catch (error) {
    console.error("getAllSubtasksController error:", error);
    return NextResponse.json({ error: "Failed to fetch subtasks" }, { status: 500 });
  }
}
