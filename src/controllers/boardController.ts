import { NextResponse } from "next/server";
import type {
  BoardState,
  BoardVisibility,
  CreateBoardInput,
  UpdateBoardInput,
} from "@/types/boards";
import {
  createBoardService,
  deleteBoardService,
  getAllByWorkspaceService,
  replaceBoardService,
} from "@/src/services/boards";

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBoardState(value: unknown): value is BoardState {
  return value === "active" || value === "inactive" || value === "finished";
}

function isBoardVisibility(value: unknown): value is BoardVisibility {
  return value === "private" || value === "workspace" || value === "public";
}

function isNotFoundBoardError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message === "NOT_FOUND_BOARD" || error.message === "NOT_FOUND")
  );
}

export async function getBoardsController(req: Request) {
  try {
    const url = new URL(req.url);
    const workspaceId = url.searchParams.get("workspace_id")?.trim();

    if (!workspaceId) {
      return NextResponse.json(
        { error: "workspace_id is required" },
        { status: 400 },
      );
    }

    const boards = await getAllByWorkspaceService(workspaceId);
    return NextResponse.json({ data: boards }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 },
    );
  }
}

export async function postBoardsController(req: Request) {
  try {
    const body: unknown = await req.json();

    if (!isObjectRecord(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const workspaceIdRaw = body.workspace_id;
    const nameRaw = body.name;
    const coverColorRaw = body.cover_color;
    const coverImageRaw = body.cover_image;
    const stateRaw = body.state;
    const visibilityRaw = body.visibility;

    if (typeof workspaceIdRaw !== "string" || workspaceIdRaw.trim() === "") {
      return NextResponse.json(
        { error: "workspace_id is required" },
        { status: 400 },
      );
    }

    if (typeof nameRaw !== "string" || nameRaw.trim() === "") {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    if (coverColorRaw !== undefined && typeof coverColorRaw !== "string") {
      return NextResponse.json(
        { error: "cover_color must be a string" },
        { status: 400 },
      );
    }

    if (coverImageRaw !== undefined && typeof coverImageRaw !== "string") {
      return NextResponse.json(
        { error: "cover_image must be a string" },
        { status: 400 },
      );
    }

    if (stateRaw !== undefined && !isBoardState(stateRaw)) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }

    if (visibilityRaw !== undefined && !isBoardVisibility(visibilityRaw)) {
      return NextResponse.json(
        { error: "Invalid visibility" },
        { status: 400 },
      );
    }

    const payload: CreateBoardInput = {
      workspaceId: workspaceIdRaw,
      name: nameRaw,
      coverColor: coverColorRaw,
      coverImage: coverImageRaw,
      state: stateRaw,
      visibility: visibilityRaw,
    };

    const board = await createBoardService(payload);
    return NextResponse.json({ data: board }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create board" },
      { status: 500 },
    );
  }
}

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

export async function deleteBoardController(id: string) {
  try {
    const boardId = id.trim();

    if (!boardId) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const board = await deleteBoardService(boardId);
    return NextResponse.json({ data: board }, { status: 200 });
  } catch (error) {
    if (isNotFoundBoardError(error)) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete board" },
      { status: 500 },
    );
  }
}
