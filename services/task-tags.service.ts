import { apiClient } from "@/lib/api-client";
import type { TaskTagDTO } from "../types/tags";

type TaskTagsResponse = {
  data: TaskTagDTO[];
};

type TaskTagResponse = {
  data: TaskTagDTO;
};

// GET todos los tags de una tarea
export async function fetchTaskTags(taskId: string): Promise<TaskTagDTO[]> {
  const response = await apiClient<TaskTagsResponse>(
    `/api/tasks/${taskId}/tags`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  return response.data;
}

// POST agregar un tag a una tarea
export async function addTagToTask(
  taskId: string,
  tagId: string
): Promise<TaskTagDTO> {
  const response = await apiClient<TaskTagResponse>(
    `/api/tasks/${taskId}/tags`,
    {
      method: "POST",
      body: JSON.stringify({ tag_id: tagId }),
    }
  );
  return response.data;
}

// DELETE quitar un tag de una tarea
export async function removeTagFromTask(
  taskId: string,
  tagId: string
): Promise<void> {
  await apiClient(`/api/tasks/${taskId}/tags/${tagId}`, {
    method: "DELETE",
  });
}