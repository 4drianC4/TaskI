export type TaskDTO = {
    id: number;
    title: string;
    description: string | null;
    status: string;
    dueDate: string | null;
    userId: number;
    createdAt: string;
    updatedAt: string;
};

export type CreateTaskInput = {
    title: string;
    description?: string | null;
    status?: string;
    dueDate?: string | null;
    userId: number;
};