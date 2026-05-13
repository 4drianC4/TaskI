import { NextRequest } from "next/server";
import { handleGetAll, handleCreate } from "@/src/controllers/tasks-controller";

export async function GET(req: NextRequest) {
    return handleGetAll(req);
}

export async function POST(req: NextRequest) {
    return handleCreate(req);
}