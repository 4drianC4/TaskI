import { getBoardsController, postBoardsController } from "@/src/controllers/boardController";
export async function GET(req: Request) { return getBoardsController(req); }
export async function POST(req: Request) { return postBoardsController(req); }

