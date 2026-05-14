import { NextRequest, NextResponse } from "next/server";
import { getAll } from "@/src/services/tasks";

export async function getAllTasksController(req: NextRequest) {
    const tasks = await getAll(req);
    return NextResponse.json(tasks);
}