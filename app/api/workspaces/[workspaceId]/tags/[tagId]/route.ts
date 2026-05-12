import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { workspaceId: string; tagId: string } }
) {
  try {
    const tag = await prisma.tags.findFirst({
      where: { id: params.tagId, workspace_id: params.workspaceId, deleted_at: null },
    });
    if (!tag) return NextResponse.json({ error: "Tag no encontrado" }, { status: 404 });
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tag" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { workspaceId: string; tagId: string } }
) {
  try {
    const body = await req.json();
    const { name, color } = body;
    const tag = await prisma.tags.update({
      where: { id: params.tagId },
      data: {
        ...(name && { name }),
        ...(color && { color }),
      },
    });
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar tag" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { workspaceId: string; tagId: string } }
) {
  try {
    const tag = await prisma.tags.update({
      where: { id: params.tagId },
      data: { deleted_at: new Date() },
    });
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar tag" }, { status: 500 });
  }
}