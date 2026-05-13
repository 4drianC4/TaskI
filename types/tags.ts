// DTO - lo que devuelve la API
export type TagDTO = {
  id: string;
  workspace_id: string;
  name: string;
  color: string;
  deleted_at: string | null;
};

export type TaskTagDTO = {
  task_id: string;
  tag_id: string;
  tag?: TagDTO;
};

// creartag
export type CreateTagInput = {
  name: string;
  color: string;
};

// actualizartag
export type UpdateTagInput = {
  name?: string;
  color?: string;
};