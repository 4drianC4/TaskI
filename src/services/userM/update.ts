import {prisma} from "@/lib/prisma";

export const updateUser = async(
    id:string,
    data:{name?: string; email?: string}
) => {
    const user = await prisma.users.update({
        where: {id},
        data
    })
    return user;
};