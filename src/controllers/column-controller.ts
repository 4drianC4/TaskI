import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createColumnSchema, patchColumnSchema } from "@/schemas/column.schema";
import {
  getAllColumnsService,
  getColumnByIdService,
  createColumnService,
  patchColumnService,
  deleteColumnService,
  putColumnService
} from "@/src/services/column";

export async function getColumnsController(boardId: string) {
  try {
    const columns = await getAllColumnsService(boardId);
    return NextResponse.json({ data: columns }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "No se pudieron obtener las columnas" }, { status: 500 });
  }
}

export async function getColumnByIdController(id: string) {
  try {
    const column = await getColumnByIdService(id);
    if (!column) {
      return NextResponse.json({ error: "Columna no encontrada" }, { status: 404 });
    }
    return NextResponse.json({ data: column }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "No se pudo obtener la columna" }, { status: 500 });
  }
}

export async function postColumnController(req: Request) {
  try {
    const body = await req.json();
    const payload = createColumnSchema.parse(body);
    const column = await createColumnService(payload);
    return NextResponse.json({ data: column }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Payload inválido", details: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "No se pudo crear la columna" }, { status: 500 });
  }
}

export async function patchColumnController(req: Request, id: string) {
  try {
    const body = await req.json();
    const payload = patchColumnSchema.parse(body);
    const column = await patchColumnService(id, payload);
    return NextResponse.json({ data: column }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Payload inválido", details: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "No se pudo actualizar la columna" }, { status: 500 });
  }
}

export async function deleteColumnController(id: string) {
  try {
    const column = await deleteColumnService(id);
    return NextResponse.json({ data: column }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "No se pudo eliminar la columna" }, { status: 500 });
  }
}

export async function putColumnController(req: Request, id: string) {
  try {
    const body = await req.json();
    const column = await putColumnService(id, body);
    return NextResponse.json({ data: column }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Payload inválido", details: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "No se pudo reemplazar la columna" }, { status: 500 });
  }
}