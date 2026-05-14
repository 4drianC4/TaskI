import { NextRequest, NextResponse } from "next/server";
import { put } from "@/src/services/tasks";

export async function putTaskController(id: string, req: NextRequest) {
    try {
        const body = await req.json();
        const task = await put(id, body);
        return NextResponse.json(task);
    } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error(String(e));
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}