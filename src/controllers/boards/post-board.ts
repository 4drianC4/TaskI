import { NextResponse } from "next/server";
import type { CreateBoardInput} from "@/types/boards";
import {
  createBoardService
} from "@/src/services/boards";
import { isObjectRecord, isBoardState, isBoardVisibility} from "./helpers";

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
