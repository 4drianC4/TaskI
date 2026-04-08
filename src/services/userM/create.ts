import { prisma } from "@/lib/prisma";

export const createUser = async (data:{
    name?: string;
    email: string;
    system_role_id: string;
}) =>{
    const existe = await prisma.users.findUnique({
        where: {email: data.email}
    });
    if(existe){
        throw new Error("El email ya existe");
    }

    const user = await prisma.users.create({
        data
    });
    return user;
};