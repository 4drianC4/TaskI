import { NextRequest, NextResponse } from "next/server";
import * as userService from "@/src/services/userM";


export const getUsers = async () => {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
};


export const createUser = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const user = await userService.createUser(body);

    return NextResponse.json(user, { status: 201 });

  } catch (error: unknown) {

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error desconocido" },
      { status: 500 }
    );
  }
};


export const getUser = async (id: string) => {
  try {
    const user = await userService.getUserById(id);

    return NextResponse.json(user, { status: 200 });

  } catch (error: unknown) {

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error desconocido" },
      { status: 500 }
    );
  }
};


export const updateUser = async (req: NextRequest, id: string) => {
  try {
    const body = await req.json();
    const user = await userService.updateUser(id, body);

    return NextResponse.json(user, { status: 200 });

  } catch {
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 400 }
    );
  }
};

export const deleteUser = async (id: string) => {
  try {
    await userService.deleteUser(id);

    return NextResponse.json(
      { message: "Usuario eliminado" },
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 400 }
    );
  }
};