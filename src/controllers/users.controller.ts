import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createUserSchema } from "@/schemas/user.schema";
import { createUserService, listUsersService } from "@/src/services/users.service";

function isPrismaUniqueError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

export async function getUsersController() {
  try {
    const users = await listUsersService();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener los usuarios" },
      { status: 500 },
    );
  }
}

export async function postUsersController(req: Request) {
  try {
    const body = await req.json();
    const payload = createUserSchema.parse(body);

    const user = await createUserService(payload);
    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Payload invalido",
          details: error.flatten(),
        },
        { status: 400 },
      );
    }

    if (isPrismaUniqueError(error)) {
      return NextResponse.json(
        { error: "Ya existe un usuario con ese email" },
        { status: 409 },
      );
    }

    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { error: "No se pudo crear el usuario" },
      { status: 500 },
    );
  }
}
