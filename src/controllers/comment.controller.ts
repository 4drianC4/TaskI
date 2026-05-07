import { NextRequest, NextResponse } from "next/server";
import {
    createCommentService,
    getAllCommentsService,
    getCommentByIdService,
    updateCommentService,
    deleteCommentService,
} from "@/src/services/user/comment";

export async function getComments(taskId: string) {
    try {
        const data = await getAllCommentsService(taskId);
        return NextResponse.json({ data });
    } catch {
        return NextResponse.json({ error: "Error al obtener comments" }, { status: 500 });
    }
}

export async function getCommentById(id: string) {
    try {
        const data = await getCommentByIdService(id);
        if (!data) return NextResponse.json({ error: "Comment no encontrado" }, { status: 404 });
        return NextResponse.json({ data });
    } catch {
        return NextResponse.json({ error: "Error al obtener comment" }, { status: 500 });
    }
}

export async function createComment(req: NextRequest, taskId: string) {
    try {
        const body = await req.json();
        const { user_id, content } = body;
        if (!user_id || !content) {
            return NextResponse.json({ error: "user_id y content son requeridos" }, { status: 400 });
        }
        const data = await createCommentService({ task_id: taskId, user_id, content });
        return NextResponse.json({ data }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al crear comment" }, { status: 500 });
    }
}

export async function updateComment(req: NextRequest, id: string, taskId: string) {
    try {
        const body = await req.json();
        const { content, user_id } = body;
        if (!content || !user_id) {
            return NextResponse.json({ error: "content y user_id son requeridos" }, { status: 400 });
        }
        const data = await updateCommentService(id, { content, user_id, task_id: taskId });
        if (!data) return NextResponse.json({ error: "Comment no encontrado" }, { status: 404 });
        return NextResponse.json({ data });
    } catch {
        return NextResponse.json({ error: "Error al actualizar comment" }, { status: 500 });
    }
}

export async function deleteComment(id: string) {
    try {
        const data = await deleteCommentService(id);
        if (!data) return NextResponse.json({ error: "Comment no encontrado" }, { status: 404 });
        return NextResponse.json({ data });
    } catch {
        return NextResponse.json({ error: "Error al eliminar comment" }, { status: 500 });
    }
}
