// app/api/workspaces/[workspaceId]/tags/route.ts
// GET todos los tags | POST crear tag

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/workspaces/:workspaceId/tags
export async function GET(
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) {
  try {
    const tags = await prisma.tags.findMany({
      where: {
        workspace_id: params.workspaceId,
        deleted_at: null,
      },
    });

    return NextResponse.json({ data: tags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tags" }, { status: 500 });
  }
}

// POST /api/workspaces/:workspaceId/tags
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
      data: {
        workspace_id: params.workspaceId,
        name,
        color,
      },
    });

    return NextResponse.json({ data: tag }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear tag" }, { status: 500 });
  }
}

// ===========================================================
// app/api/workspaces/[workspaceId]/tags/[tagId]/route.ts
// GET uno | PUT actualizar | DELETE eliminar
// ===========================================================

// GET /api/workspaces/:workspaceId/tags/:tagId
export async function GET_ONE(
  req: NextRequest,
  { params }: { params: { workspaceId: string; tagId: string } }
) {
  try {
    const tag = await prisma.tags.findFirst({
      where: {
        id: params.tagId,
        workspace_id: params.workspaceId,
        deleted_at: null,
      },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ data: tag }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tag" }, { status: 500 });
  }
}

// PUT /api/workspaces/:workspaceId/tags/:tagId
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

// DELETE /api/workspaces/:workspaceId/tags/:tagId  (soft delete)
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

// ===========================================================
// app/api/tasks/[taskId]/tags/route.ts
// GET tags de una tarea | POST agregar tag | DELETE quitar tag
// ===========================================================

// GET /api/tasks/:taskId/tags
export async function GET_TASK_TAGS(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const taskTags = await prisma.taskTags.findMany({
      where: { task_id: params.taskId },
      include: { tag: true },
    });

    return NextResponse.json({ data: taskTags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tags de la tarea" }, { status: 500 });
  }
}

// POST /api/tasks/:taskId/tags
export async function POST_TASK_TAG(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await req.json();
    const { tag_id } = body;

    if (!tag_id) {
      return NextResponse.json({ error: "tag_id es requerido" }, { status: 400 });
    }

    const taskTag = await prisma.taskTags.create({
      data: {
        task_id: params.taskId,
        tag_id,
      },
      include: { tag: true },
    });

    return NextResponse.json({ data: taskTag }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al agregar tag a la tarea" }, { status: 500 });
  }
}

// DELETE /api/tasks/:taskId/tags/:tagId
export async function DELETE_TASK_TAG(
  req: NextRequest,
  { params }: { params: { taskId: string; tagId: string } }
) {
  try {
    await prisma.taskTags.delete({
      where: {
        task_id_tag_id: {
          task_id: params.taskId,
          tag_id: params.tagId,
        },
      },
    });

    return NextResponse.json({ message: "Tag eliminado de la tarea" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al quitar tag de la tarea" }, { status: 500 });
  }
}