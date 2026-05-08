import {
  getColumnByIdController,
  patchColumnController,
  deleteColumnController,
  putColumnController
} from "@/src/controllers/column";


export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return getColumnByIdController(id);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return patchColumnController(req, id);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return deleteColumnController(id);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return putColumnController(req, id);
}
