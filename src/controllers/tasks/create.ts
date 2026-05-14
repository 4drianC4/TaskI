import { NextRequest, NextResponse } from "next/server";
import { create } from "@/src/services/tasks";

export async function createTaskController(req: NextRequest) {
    try {
        const body = await req.json();
        const task = await create(body);
        return NextResponse.json(task, { status: 201 });
    } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error(String(e));
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}