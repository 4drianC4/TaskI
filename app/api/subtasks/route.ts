import { getAllSubtasksController, postSubtasksController, patchSubtasksController } from "@/src/controllers/subtask";

export async function GET(req: Request) {
  return getAllSubtasksController(req);
}

export async function POST(req: Request) {
  return postSubtasksController(req);
}

export async function PATCH(req: Request) {
  return patchSubtasksController(req);
}
