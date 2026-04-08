import {prisma} from "@/lib/prisma";

export const getUserById = async(id: string) =>{
    const user = await prisma.users.findUnique({
        where: {id}
    });
    if(!user){
        throw new Error ("Usuario no encontrado");
    }
    return user;
};