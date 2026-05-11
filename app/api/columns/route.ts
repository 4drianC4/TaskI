import {
  getColumnsController, postColumnController
} from "@/src/controllers/column";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const boardId = searchParams.get("boardId");
  if (!boardId) return NextResponse.json({ error: "boardId es requerido" }, { status: 400 });

  return getColumnsController(boardId);
}

export async function POST(req: Request) {
  return postColumnController(req);
}
