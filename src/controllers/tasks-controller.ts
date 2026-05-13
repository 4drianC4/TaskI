import { NextRequest, NextResponse } from "next/server";
import { getAll, getById, create, patch, put, deleteTask } from "@/src/services/tasks";

export async function handleGetAll(req: NextRequest) {
    const tasks = await getAll(req);
    return NextResponse.json(tasks);
}

export async function handleGetById(id: string) {
    const task = await getById(id);
    if (!task) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(task);
}

export async function handleCreate(req: NextRequest) {
    try {
        const body = await req.json();
        const task = await create(body);
        return NextResponse.json(task, { status: 201 });
    } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error(String(e));
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function handlePatch(id: string, req: NextRequest) {
    const body = await req.json();
    const task = await patch(id, body);
    return NextResponse.json(task);
}

export async function handlePut(id: string, req: NextRequest) {
    try {
        const body = await req.json();
        const task = await put(id, body);
        return NextResponse.json(task);
    } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error(String(e));
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function handleDelete(id: string) {
    await deleteTask(id);
    return NextResponse.json({ message: "Task eliminada" });
}