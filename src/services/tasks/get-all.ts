import { TaskService } from "./service";
import { NextRequest } from "next/server";

export async function getAll(req: NextRequest) {
    const column_id = req.nextUrl.searchParams.get("column_id") ?? undefined;
    return TaskService.getAll(column_id);
}