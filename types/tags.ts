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

// Input para crear un tag
export type CreateTagInput = {
  name: string;
  color: string;
};

// Input para actualizar un tag
export type UpdateTagInput = {
  name?: string;
  color?: string;
};