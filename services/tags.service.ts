import { apiClient } from "@/lib/api-client";
import type { CreateTagInput, UpdateTagInput, TagDTO } from "../types/tags";

type TagsResponse = {
  data: TagDTO[];
};

type TagResponse = {
  data: TagDTO;
};

// GET todos los tags de un workspace
export async function fetchTags(workspaceId: string): Promise<TagDTO[]> {
  const response = await apiClient<TagsResponse>(
    `/api/workspaces/${workspaceId}/tags`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  return response.data;
}

// GET un tag por ID
export async function fetchTagById(
  workspaceId: string,
  tagId: string
): Promise<TagDTO> {
  const response = await apiClient<TagResponse>(
    `/api/workspaces/${workspaceId}/tags/${tagId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  return response.data;
}

// POST crear tag
export async function createTag(
  workspaceId: string,
  input: CreateTagInput
): Promise<TagDTO> {
  const response = await apiClient<TagResponse>(
    `/api/workspaces/${workspaceId}/tags`,
    {
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  return response.data;
}

// PUT actualizar tag
export async function updateTag(
  workspaceId: string,
  tagId: string,
  input: UpdateTagInput
): Promise<TagDTO> {
  const response = await apiClient<TagResponse>(
    `/api/workspaces/${workspaceId}/tags/${tagId}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    }
  );
  return response.data;
}

// DELETE eliminar tag (soft delete)
export async function deleteTag(
  workspaceId: string,
  tagId: string
): Promise<void> {
  await apiClient(`/api/workspaces/${workspaceId}/tags/${tagId}`, {
    method: "DELETE",
  });
}