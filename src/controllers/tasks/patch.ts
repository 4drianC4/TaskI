import { NextRequest, NextResponse } from "next/server";
import { patch } from "@/src/services/tasks";

export async function patchTaskController(id: string, req: NextRequest) {
    const body = await req.json();
    const task = await patch(id, body);
    return NextResponse.json(task);
}