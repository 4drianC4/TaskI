import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string; tagId: string }> }
) {
  try {
    const { workspaceId, tagId } = await params;
    const tag = await prisma.tags.findFirst({
      where: { id: tagId, workspace_id: workspaceId, deleted_at: null },
    });
    if (!tag) return NextResponse.json({ error: "Tag no encontrado" }, { status: 404 });
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tag" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string; tagId: string }> }
) {
  try {
    const { tagId } = await params;
    const body = await req.json();
    const { name, color } = body;
    const tag = await prisma.tags.update({
      where: { id: tagId },
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
  { params }: { params: Promise<{ workspaceId: string; tagId: string }> }
) {
  try {
    const { tagId } = await params;
    const tag = await prisma.tags.update({
      where: { id: tagId },
      data: { deleted_at: new Date() },
    });
    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar tag" }, { status: 500 });
  }
}
