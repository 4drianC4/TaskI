import { NextResponse } from "next/server";
import type { UpdateBoardInput } from "@/types/boards";
import {
  replaceBoardService,
} from "@/src/services/boards";
import { isObjectRecord, isBoardState, isBoardVisibility, isNotFoundBoardError} from "./helpers";
export async function putBoardController(req: Request, id: string) {
  try {
    const boardId = id.trim();
    if (!boardId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body: unknown = await req.json();

    if (!isObjectRecord(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const allowedKeys = new Set([
      "name",
      "cover_color",
      "cover_image",
      "state",
      "visibility",
    ]);

    const bodyKeys = Object.keys(body);
    const hasInvalidKey = bodyKeys.some((key) => !allowedKeys.has(key));

    if (hasInvalidKey) {
      return NextResponse.json(
        { error: "Payload contains disallowed fields" },
        { status: 400 },
      );
    }

    const payload: UpdateBoardInput = {};

    if ("name" in body) {
      if (typeof body.name !== "string") {
        return NextResponse.json(
          { error: "name must be a string" },
          { status: 400 },
        );
      }
      payload.name = body.name;
    }

    if ("cover_color" in body) {
      if (body.cover_color !== null && typeof body.cover_color !== "string") {
        return NextResponse.json(
          { error: "cover_color must be a string or null" },
          { status: 400 },
        );
      }
      payload.coverColor = body.cover_color;
    }

    if ("cover_image" in body) {
      if (body.cover_image !== null && typeof body.cover_image !== "string") {
        return NextResponse.json(
          { error: "cover_image must be a string or null" },
          { status: 400 },
        );
      }
      payload.coverImage = body.cover_image;
    }

    if ("state" in body) {
      if (body.state !== null && !isBoardState(body.state)) {
        return NextResponse.json({ error: "Invalid state" }, { status: 400 });
      }
      payload.state = body.state;
    }

    if ("visibility" in body) {
      if (body.visibility !== null && !isBoardVisibility(body.visibility)) {
        return NextResponse.json(
          { error: "Invalid visibility" },
          { status: 400 },
        );
      }
      payload.visibility = body.visibility;
    }

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { error: "You must provide at least one field to update" },
        { status: 400 },
      );
    }

    const board = await replaceBoardService(boardId, payload);
    return NextResponse.json({ data: board }, { status: 200 });
  } catch (error) {
    if (isNotFoundBoardError(error)) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update board" },
      { status: 500 },
    );
  }
}
