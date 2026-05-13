import { getSubtaskController, putSubtaskController, patchSubtaskController, deleteSubtaskController } from "@/src/controllers/subtask";
type RouteContext = { params: { id: string } | Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteContext) {
  const { id } = await params;
  return getSubtaskController(req, id);
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;
  return putSubtaskController(req, id);
}

export async function PATCH(req: Request, { params }: RouteContext) {
  const { id } = await params;
  return patchSubtaskController(req, id);
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  return deleteSubtaskController(id);
}
