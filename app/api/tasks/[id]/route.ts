import { NextRequest } from "next/server";
import {
    handleGetById,
    handlePatch,
    handlePut,
    handleDelete,
} from "@/src/controllers/tasks-controller";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
    return handleGetById(params.id);
}

export async function PATCH(req: NextRequest, { params }: Params) {
    return handlePatch(params.id, req);
}

export async function PUT(req: NextRequest, { params }: Params) {
    return handlePut(params.id, req);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    return handleDelete(params.id);
}