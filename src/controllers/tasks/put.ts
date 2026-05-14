import { NextRequest, NextResponse } from "next/server";
import { put } from "@/src/services/tasks";

export async function putTaskController(id: string, req: NextRequest) {
    try {
        const body = await req.json();
        const task = await put(id, body);
        return NextResponse.json(task);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}