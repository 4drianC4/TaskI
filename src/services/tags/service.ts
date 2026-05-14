import type { CreateTagInput, TagDTO, UpdateTagInput } from "@/types/tags";

export type DbTag = {
  id: string;
  workspace_id: string;
  name: string;
  color: string;
  deleted_at: Date | null;
};

export function toTagDTO(tag: DbTag): TagDTO {
  return {
    id: tag.id,
    workspace_id: tag.workspace_id,
    name: tag.name,
    color: tag.color,
    deleted_at: tag.deleted_at ? tag.deleted_at.toISOString() : null,
  };
}

export type CreateTagPayload = CreateTagInput & { workspace_id: string };

export function normalizeCreateTagInput(input: CreateTagPayload): CreateTagPayload {
  return {
    workspace_id: input.workspace_id.trim(),
    name: input.name.trim(),
    color: input.color.trim(),
  };
}

export function normalizeUpdateTagInput(input: UpdateTagInput): UpdateTagInput {
  return {
    ...(typeof input.name === "string" ? { name: input.name.trim() } : {}),
    ...(typeof input.color === "string" ? { color: input.color.trim() } : {}),
  };
}
