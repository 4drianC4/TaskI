export type ColumnDTO = {
    id: string;
    boardId: string;
    name: string;
    order: number;
    isDone: boolean;
    createdAt: string;
};

export type CreateColumnInput = {
    board_id: string;
    name: string;
    order: number;
};

export type UpdateColumnInput = {
    name?: string;
    order?: number;
    is_done?: boolean;
};

export type PutColumnInput = {
    board_id: string;
    name: string;
    order: number;
    is_done: boolean;
};

export type PatchColumnInput = {
    name?: string;
    order?: number;
    is_done?: boolean;
};