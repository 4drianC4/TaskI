import { NextRequest, NextResponse } from "next/server";
import {createCommentService,getAllCommentsService,getCommentByIdService,updateCommentService,deleteCommentService,
}from "@/src/services/comment";

export async function getComments(req: NextRequest) {
    try {
        const data = await getAllCommentsService();
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener comments" });
    }
}

export async function getCommentById(id: string) {
    try {
        const data = await getCommentByIdService(id);
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener comment" });
    }
}

export async function createComment(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await createCommentService(body);
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: "Error al crear comment" });
    }
}

export async function updateComment(req: NextRequest, id: string) {
    try {
        const body = await req.json();
        const data = await updateCommentService(id, body);
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar comment" });
    }
}

export async function deleteComment(id: string) {
    try {
        const data = await deleteCommentService(id);
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar comment" });
    }
}