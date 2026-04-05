import {prisma} from "@/lib/prisma";

export const deleteUser = async(id: string) =>{
    const user = await prisma.users.update({
        where: {id},
        data: {
            deleted_at: new Date()
        }
    });
    return user;
};