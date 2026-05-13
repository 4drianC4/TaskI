import { prisma } from "@/lib/prisma";
import { CreateTaskDTO, UpdateTaskDTO } from "@/types/task";

export const TaskService = {
    async getAll(column_id?: string) {
        return prisma.tasks.findMany({
            where: {
                deleted_at: null,
                ...(column_id ? { column_id } : {}),
            },
            orderBy: { order: "asc" },
        });
    },

    async getById(id: string) {
        return prisma.tasks.findFirst({
            where: { id, deleted_at: null },
        });
    },

    async create(data: CreateTaskDTO) {
        let order = data.order;
        if (order === undefined) {
            const last = await prisma.tasks.findFirst({
                where: { column_id: data.column_id, deleted_at: null },
                orderBy: { order: "desc" },
            });
            order = (last?.order ?? -1) + 1;
        }
        return prisma.tasks.create({
            data: {
                ...data,
                order,
                due_date: data.due_date ? new Date(data.due_date) : null,
            },
        });
    },

    async patch(id: string, data: UpdateTaskDTO) {
        return prisma.tasks.update({
            where: { id },
            data: {
                ...data,
                due_date: data.due_date ? new Date(data.due_date) : undefined,
            },
        });
    },

    async put(id: string, data: CreateTaskDTO) {
        return prisma.tasks.update({
            where: { id },
            data: {
                ...data,
                due_date: data.due_date ? new Date(data.due_date) : null,
            },
        });
    },

    async delete(id: string) {
        return prisma.tasks.update({
            where: { id },
            data: { deleted_at: new Date() },
        });
    },
};