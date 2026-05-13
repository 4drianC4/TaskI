import { NextRequest, NextResponse } from "next/server";
import type { UpdateUserInput } from "@/types/userM";
import { updateUser } from "@/src/services/userM";

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNotFoundUserError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message === "Usuario no encontrado"
  );
}

export async function updateUserController(req: NextRequest,id: string) {
  try {
    const userId = id.trim();

    if (!userId){ return NextResponse.json(
        { error: "Id inválido" },
        { status: 400 }
      );
    }

    const body: unknown = await req.json();

    if (!isObjectRecord(body)) {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    const validFields = new Set(["email", "name"]);

    const fildsSent = Object.keys(body);

    const hasInvalidKey = fildsSent.some(
      (key) => !validFields.has(key)
    );

    if (hasInvalidKey) { return NextResponse.json(
        { error: "Campos inválidos" },
        { status: 400 }
      );
    }

    const payload: UpdateUserInput = {};

    if ("email" in body) {
      if (typeof body.email !== "string") { return NextResponse.json(
          { error: "email debe ser string" },
          { status: 400 }
        );
      }
      payload.email = body.email;
    }

    if ("name" in body) {
      if (body.name !== null &&typeof body.name !== "string") {return NextResponse.json(
          { error: "name debe ser string o null" },
          { status: 400 }
        );
      }
      payload.name = body.name;
    }

    if (Object.keys(payload).length === 0) {
      return NextResponse.json(
        { error: "Debes enviar algo para actualizar" },
        { status: 400 }
      );
    }

    const user = await updateUser(userId, payload);

    return NextResponse.json(
      { data: user },
      { status: 200 }
    );
  } catch (error) {
    if (isNotFoundUserError(error)) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}