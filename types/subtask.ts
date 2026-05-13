export type SubtaskDTO = {
    id: string;
    taskId: string;
    title: string;
    order: number;
    isCompleted: boolean;
    createdAt: string;
    deletedAt: string | null;
};

export type CreateSubtaskInput = {
    taskId: string;
    title: string;
    order: number;
    isCompleted: boolean;
};

export type UpdateSubtaskInput = {
    title?: string;
    order?: number;
    isCompleted?: boolean;
};

export type ReorderSubtasksInput = {
    taskId: string;
    subtaskIds: string[];
};