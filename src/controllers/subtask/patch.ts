import { NextResponse } from "next/server";
import type { UpdateSubtaskInput } from "@/types/subtask";
import { patchSubtaskService } from "@/src/services/subtask";
import { prisma } from "@/lib/prisma";
import type { ReorderSubtasksInput } from "@/types/subtask";
import { toSubtaskDTO } from "@/src/services/subtask/service";

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function patchSubtasksController(req: Request) {
  try {
    const body: unknown = await req.json();

    if (!isObjectRecord(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const taskIdRaw = body.task_id ?? body.taskId;
    const subtaskIdsRaw = body.subtask_ids ?? body.subtaskIds;

    if (typeof taskIdRaw !== "string" || taskIdRaw.trim() === "") {
      return NextResponse.json({ error: "task_id is required" }, { status: 400 });
    }

    if (!Array.isArray(subtaskIdsRaw) || subtaskIdsRaw.some((id) => typeof id !== "string")) {
      return NextResponse.json({ error: "subtask_ids must be an array of ids" }, { status: 400 });
    }

    const payload: ReorderSubtasksInput = {
      taskId: taskIdRaw.trim(),
      subtaskIds: subtaskIdsRaw.map((id) => id.trim()).filter(Boolean),
    };

    if (payload.subtaskIds.length === 0) {
      return NextResponse.json({ error: "subtask_ids must not be empty" }, { status: 400 });
    }

    const existing = await prisma.subtasks.findMany({
      where: {
        id: { in: payload.subtaskIds },
        task_id: payload.taskId,
      },
    });

    if (existing.length !== payload.subtaskIds.length) {
      return NextResponse.json({ error: "Some subtasks not found" }, { status: 404 });
    }

    const reordered = await prisma.$transaction(
      payload.subtaskIds.map((id, index) =>
        prisma.subtasks.update({
          where: { id },
          data: { order: index },
        }),
      ),
    );

    return NextResponse.json({ data: reordered.map(toSubtaskDTO) }, { status: 200 });
  } catch (error) {
    console.error("patchSubtasksController error:", error);

    return NextResponse.json({ error: "Failed to reorder subtasks" }, { status: 500 });
  }
}

export async function patchSubtaskController(req: Request, id: string) {
  try {
    const subtaskId = id.trim();

    if (!subtaskId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body: unknown = await req.json();

    if (!isObjectRecord(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const input: UpdateSubtaskInput = {};

    if ("title" in body) {
      if (typeof body.title !== "string") {
        return NextResponse.json({ error: "title must be a string" }, { status: 400 });
      }
      input.title = body.title;
    }

    if ("order" in body) {
      if (typeof body.order !== "number") {
        return NextResponse.json({ error: "order must be a number" }, { status: 400 });
      }
      input.order = body.order;
    }

    if ("isCompleted" in body) {
      if (typeof body.isCompleted !== "boolean") {
        return NextResponse.json({ error: "isCompleted must be a boolean" }, { status: 400 });
      }
      input.isCompleted = body.isCompleted;
    }

    if (Object.keys(input).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const updatedSubtask = await patchSubtaskService(subtaskId, input);
    return NextResponse.json({ data: updatedSubtask }, { status: 200 });
  } catch (error) {
    console.error("patchSubtaskController error:", error);

    if (error instanceof Error) {
      // Prisma v7: P2025 = Record to update not found
      if ((error as any).code === "P2025" || error.message === "NOT_FOUND") {
        return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
      }
    }

    return NextResponse.json({ error: "Failed to update subtask" }, { status: 500 });
  }
}
