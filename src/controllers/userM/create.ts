import { NextRequest, NextResponse } from "next/server";
import type { CreateUserInput } from "@/types/userM";
import { createUser } from "@/src/services/userM";

//recibes ,lees,validas, crear,services,response

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function createUserController(req: NextRequest) {
  try {
    const body: unknown = await req.json();

    if (!isObjectRecord(body)) { return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    const emailI = body.email;
    const nameI = body.name;
    const systemRoleIdI = body.systemRoleId;

    if (typeof emailI !== "string" || emailI.trim() === "") {return NextResponse.json(
        { error: "email es requerido" },
        { status: 400 }
      );
    }

    if (nameI !== undefined && typeof nameI !== "string") {
      return NextResponse.json(
        { error: "name debe ser string" },
        { status: 400 }
      );
    }

    if (typeof systemRoleIdI !== "string" || systemRoleIdI.trim() === ""){ return NextResponse.json(
        { error: "systemRoleId es requerido" },
        { status: 400 }
      );
    }

    const payload: CreateUserInput = {
      email: emailI,
      name: nameI,
      systemRoleId: systemRoleIdI,
    };

    const user = await createUser(payload);

    return NextResponse.json(
      { data: user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}