export type DbColumn = {
  id: string;
  board_id: string;
  name: string;
  order: number;
  is_done: boolean;
  created_at: Date;
  deleted_at: Date | null;
};

export type ColumnDTO = {
  id: string;
  boardId: string;
  name: string;
  order: number;
  isDone: boolean;
  createdAt: string;
};

export function toColumnDTO(column: DbColumn): ColumnDTO {
  return {
    id: column.id,
    boardId: column.board_id,
    name: column.name,
    order: column.order,
    isDone: column.is_done,
    createdAt: column.created_at.toISOString(),
  };
}