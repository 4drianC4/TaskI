import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  try {
    const tags = await prisma.tags.findMany({
      where: { workspace_id: params.workspaceId, deleted_at: null },
    });
    return NextResponse.json({ data: tags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tags" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  try {
    const body = await req.json();
    const { name, color } = body;
    if (!name || !color) {
      return NextResponse.json(
        { error: "name y color son requeridos" },
        { status: 400 }
      );
    }
    const tag = await prisma.tags.create({
      data: { workspace_id: params.workspaceId, name, color },
    });
    return NextResponse.json({ data: tag }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear tag" }, { status: 500 });
  }
}