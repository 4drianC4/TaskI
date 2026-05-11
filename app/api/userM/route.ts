import { NextRequest } from "next/server";

import {getUsersController,createUserController,} from "@/src/controllers/userM";

export async function GET() {
  return getUsersController();
}

export async function POST(req: NextRequest) {
  return createUserController(req);
}