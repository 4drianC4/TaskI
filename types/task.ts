export type CreateTaskDTO = {
    column_id: string;
    assignee_id?: string;
    title: string;
    description?: string;
    order?: number;
    due_date?: string;
};

export type UpdateTaskDTO = Partial<CreateTaskDTO>;