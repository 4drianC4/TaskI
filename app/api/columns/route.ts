import {
  getColumnsController, postColumnController
} from "@/src/controllers/column";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const boardId = searchParams.get("boardId") ?? "";
  return getColumnsController(boardId);
}

export async function POST(req: Request) {
  return postColumnController(req);
}
