import { NextRequest } from "next/server";
import {
    getTaskByIdController,
    patchTaskController,
    putTaskController,
    deleteTaskController
} from "@/src/controllers/tasks/index";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    return getTaskByIdController(id);
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { id } = await params;
    return patchTaskController(id, req);
}

export async function PUT(req: NextRequest, { params }: Params) {
    const { id } = await params;
    return putTaskController(id, req);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    return deleteTaskController(id);
}