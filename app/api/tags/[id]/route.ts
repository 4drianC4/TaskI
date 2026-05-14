import {
  deleteTagController,
  getTagController,
  patchTagController,
  putTagController,
} from "@/src/controllers/tags";

type RouteContext = { params: { id: string } | Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteContext) {
  const { id } = await params;
  return getTagController(req, id);
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;
  return putTagController(req, id);
}

export async function PATCH(req: Request, { params }: RouteContext) {
  const { id } = await params;
  return patchTagController(req, id);
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  return deleteTagController(id);
}
