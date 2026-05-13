import { NextResponse } from "next/server";
import type { CreateSubtaskInput } from "@/types/subtask";
import { createSubtaskService } from "@/src/services/subtask/create";

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function postSubtasksController(req: Request) {
  try {
    const body: unknown = await req.json();

    if (!isObjectRecord(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const taskIdRaw = body.task_id ?? body.taskId;
    const titleRaw = body.title;
    const orderRaw = body.order;
    const isCompletedRaw = body.is_completed ?? body.isCompleted ?? false;

    if (typeof taskIdRaw !== "string" || taskIdRaw.trim() === "") {
      return NextResponse.json({ error: "task_id is required" }, { status: 400 });
    }

    if (typeof titleRaw !== "string" || titleRaw.trim() === "") {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    if (typeof orderRaw !== "number" || !Number.isFinite(orderRaw)) {
      return NextResponse.json({ error: "order must be a number" }, { status: 400 });
    }

    if (typeof isCompletedRaw !== "boolean") {
      return NextResponse.json({ error: "is_completed must be boolean" }, { status: 400 });
    }

    const payload: CreateSubtaskInput = {
      taskId: taskIdRaw.trim(),
      title: titleRaw.trim(),
      order: orderRaw,
      isCompleted: isCompletedRaw,
    };

    const subtask = await createSubtaskService(payload);
    return NextResponse.json({ data: subtask }, { status: 201 });
  } catch (error) {
    console.error("postSubtasksController error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint failed")) {
        return NextResponse.json(
          { error: "task_id not found or invalid" },
          { status: 404 }
        );
      }
      if (error.message.includes("Unique constraint failed")) {
        return NextResponse.json(
          { error: "Subtask already exists with these parameters" },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json({ error: "Failed to create subtask" }, { status: 500 });
  }
}
