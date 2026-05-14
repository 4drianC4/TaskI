import { NextRequest } from "next/server";
import { getCommentByIdController, updateCommentController, deleteCommentController } from "@/src/controllers/comment";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    return getCommentByIdController(id);
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { id } = await params;
    return updateCommentController(req, id);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    return deleteCommentController(id);
}
