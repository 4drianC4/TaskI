import { NextRequest } from "next/server";
import {getUser,updateUser,deleteUser} from "@/src/controllers/userM/user-controller";


export async function GET(
  req: NextRequest,{ params }: { params: { id: string } }
) {
  return getUser(params.id);
}


export async function PUT(
  req: NextRequest,{ params }: { params: { id: string } }
) {
  return updateUser(req, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return deleteUser(params.id);
}