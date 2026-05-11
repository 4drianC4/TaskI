import { NextResponse } from "next/server";
import { getAllUsers } from "@/src/services/userM";

export async function getUsersController() {
  try {
    const users = await getAllUsers();

    return NextResponse.json(
      { data: users },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}