import { NextResponse } from "next/server";
import type { UpdateSubtaskInput } from "@/types/subtask";
import { replaceSubtaskService } from "@/src/services/subtask";

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function putSubtaskController(req: Request, id: string) {
  try {
    const subtaskId = id.trim();
    if (!subtaskId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body: unknown = await req.json();
    if (!isObjectRecord(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const allowed = new Set(["title", "order", "is_completed", "isCompleted"]);
    const keys = Object.keys(body);
    const hasInvalid = keys.some((k) => !allowed.has(k));
    if (hasInvalid) {
      return NextResponse.json({ error: "Payload contains disallowed fields" }, { status: 400 });
    }

    const payload: UpdateSubtaskInput = {};
    if ("title" in body) {
      const v = body["title"] as unknown;
      if (typeof v !== "string") return NextResponse.json({ error: "title must be a string" }, { status: 400 });
      payload.title = v;
    }

    if ("order" in body) {
      const v = body["order"] as unknown;
      if (typeof v !== "number" || !Number.isFinite(v)) {
        return NextResponse.json({ error: "order must be a number" }, { status: 400 });
      }
      payload.order = v;
    }

    if ("is_completed" in body || "isCompleted" in body) {
      const v = (body["is_completed"] ?? body["isCompleted"]) as unknown;
      if (typeof v !== "boolean") return NextResponse.json({ error: "is_completed must be boolean" }, { status: 400 });
      payload.isCompleted = v;
    }

    if (Object.keys(payload).length === 0) {
      return NextResponse.json({ error: "You must provide at least one field to update" }, { status: 400 });
    }

    const updated = await replaceSubtaskService(subtaskId, payload);
    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      // Prisma v7: P2025 = Record to update not found
      if ((error as any).code === "P2025" || error.message === "NOT_FOUND") {
        return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
      }
    }
    return NextResponse.json({ error: "Failed to update subtask" }, { status: 500 });
  }
}
