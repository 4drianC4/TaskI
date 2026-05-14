import { createTagController, getAllTagsController } from "@/src/controllers/tags";

export async function GET(req: Request) {
  return getAllTagsController(req);
}

export async function POST(req: Request) {
  return createTagController(req);
}
