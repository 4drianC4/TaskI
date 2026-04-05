import { NextRequest } from "next/server";
import {getCommentById,updateComment,deleteComment,} from "@/src/controllers/comment-controller";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    return getCommentById(params.id);
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } } 
) {
    return updateComment(req, params.id);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    return deleteComment(params.id);
}