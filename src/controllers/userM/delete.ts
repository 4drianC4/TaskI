import { NextResponse } from "next/server";
import { deleteUser } from "@/src/services/userM";


function isNotFoundUserError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message === "Usuario no encontrado"
  );
}

export async function deleteUserController(id: string) {
  try {
    const userId = id.trim();

    if(!userId){return NextResponse.json(
        { error: "Id inválido" },
        { status: 400 }
      );
    }

    const user = await deleteUser(userId);
    return NextResponse.json(
      { data: user },
      { status: 200 }
    );
  } catch(error){
    if (isNotFoundUserError(error)) { return NextResponse.json(
        {error:"Usuario no encontrado"},
        {status: 404}
      );
    }
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}