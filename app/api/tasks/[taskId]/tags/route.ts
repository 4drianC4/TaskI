import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const taskTags = await prisma.taskTags.findMany({
      where: { task_id: taskId },
      include: { tag: true },
    });
    return NextResponse.json({ data: taskTags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tags de la tarea" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const body = await req.json();
    const { tag_id } = body;
    if (!tag_id) {
      return NextResponse.json({ error: "tag_id es requerido" }, { status: 400 });
    }
    const taskTag = await prisma.taskTags.create({
      data: { task_id: taskId, tag_id },
      include: { tag: true },
    });
    return NextResponse.json({ data: taskTag }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al agregar tag a la tarea" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const body = await req.json();
    const { tag_id } = body;
    await prisma.taskTags.delete({
      where: {
        task_id_tag_id: {
          task_id: taskId,
          tag_id,
        },
      },
    });
    return NextResponse.json({ message: "Tag eliminado de la tarea" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al quitar tag de la tarea" }, { status: 500 });
  }
}