import { NextRequest } from "next/server";
import { getComments, createComment } from "@/src/controllers/comment.controller";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    const { taskId } = await params;
    return getComments(taskId);
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ taskId: string }> }
) {
    const { taskId } = await params;
    return createComment(req, taskId);
}
