import { NextRequest } from "next/server";
import { getUsers, createUser } from "@/src/controllers/userM/user-controller";


export async function GET() {
  return getUsers();
}

export async function POST(req: NextRequest) {
  return createUser(req);
}