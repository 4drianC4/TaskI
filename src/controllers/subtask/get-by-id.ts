import { NextResponse } from "next/server";
import { getSubtaskByIdService } from "@/src/services/subtask";

export async function getSubtaskController(_: Request, id: string) {
  try {
    const subtaskId = id.trim();
    if (!subtaskId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const subtask = await getSubtaskByIdService(subtaskId);
    if (!subtask) {
      return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
    }

    return NextResponse.json({ data: subtask }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch subtask" }, { status: 500 });
  }
}
