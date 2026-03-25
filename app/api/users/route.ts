import { getUsersController, postUsersController } from "@/src/controllers/user-controller";

export async function GET() {
  return getUsersController();
}

export async function POST(req: Request) {
  return postUsersController(req);
}
