import {
  getColumnByIdController,
  patchColumnController,
  deleteColumnController,
  putColumnController
} from "@/src/controllers/column-controller";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  return getColumnByIdController(params.id);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  return patchColumnController(req, params.id);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  return deleteColumnController(params.id);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return putColumnController(req, params.id);
}