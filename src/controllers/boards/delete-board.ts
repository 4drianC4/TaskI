import { NextResponse } from "next/server";
import {
  isNotFoundBoardError
} from "./helpers";
import { deleteBoardService } from "../../services/boards";
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
