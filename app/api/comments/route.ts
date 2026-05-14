import { NextRequest } from "next/server";
import { getAllCommentsController, createCommentController } from "@/src/controllers/comment";

export async function GET(req: NextRequest) {
    return getAllCommentsController(req);
}

export async function POST(req: NextRequest) {
    return createCommentController(req);
}
