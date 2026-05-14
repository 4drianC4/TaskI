import { NextRequest } from "next/server";
import { getAllTasksController, createTaskController } from "@/src/controllers/tasks/index";

export async function GET(req: NextRequest) {
    return getAllTasksController(req);
}

export async function POST(req: NextRequest) {
    return createTaskController(req);
}