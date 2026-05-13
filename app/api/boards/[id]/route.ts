import {
  deleteBoardController,
  putBoardController,
} from "@/src/controllers/boardController";
type RouteContext = { params: { id: string } | Promise<{ id: string }> };
export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;
  return putBoardController(req, id);
}
export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  return deleteBoardController(id);
}
