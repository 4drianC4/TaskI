import { NextRequest, NextResponse } from "next/server";
import { create } from "@/src/services/tasks";

export async function createTaskController(req: NextRequest) {
    try {
        const body = await req.json();
        const task = await create(body);
        return NextResponse.json(task, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}