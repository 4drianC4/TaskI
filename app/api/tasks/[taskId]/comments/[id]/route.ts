import { NextRequest } from "next/server";
import { getCommentById, updateComment, deleteComment } from "@/src/controllers/comment.controller";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ taskId: string; id: string }> }
) {
    const { id } = await params;
    return getCommentById(id);
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ taskId: string; id: string }> }
) {
    const { taskId, id } = await params;
    return updateComment(req, id, taskId);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ taskId: string; id: string }> }
) {
    const { id } = await params;
    return deleteComment(id);
}
