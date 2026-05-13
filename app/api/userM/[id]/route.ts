import { NextRequest } from "next/server";

import {
  getUserController,
  updateUserController,
  deleteUserController,
} from "@/src/controllers/userM";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  req: Request,
  { params }: Params
) {
  return getUserController(params.id);
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  return updateUserController(req, params.id);
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  return deleteUserController(params.id);
}