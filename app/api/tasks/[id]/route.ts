import { NextRequest } from "next/server";
import {
    handleGetById,
    handlePatch,
    handlePut,
    handleDelete,
} from "@/src/controllers/tasks-controller";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    return handleGetById(id);
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { id } = await params;
    return handlePatch(id, req);
}

export async function PUT(req: NextRequest, { params }: Params) {
    const { id } = await params;
    return handlePut(id, req);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    return handleDelete(id);
}