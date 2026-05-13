import { NextRequest } from "next/server";

import {getUserController,updateUserController,deleteUserController,} from "@/src/controllers/userM";

type Params = {params: Promise<{id: string;}>;};

export async function GET(req: Request,{ params }: Params) {
  const { id } = await params;

  return getUserController(id);
}

export async function PUT(req: NextRequest,{ params }: Params) {
  const { id } = await params;

  return updateUserController(req, id);
}

export async function DELETE(req: Request,{ params }: Params){
  const { id } = await params;

  return deleteUserController(id);
}