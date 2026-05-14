import { z } from "zod";

export const createCommentSchema = z.object({
  task_id: z.string().min(1, "task_id es requerido"),
  user_id: z.string().min(1, "user_id es requerido"),
  content: z.string().trim().min(1, "content es requerido").max(500),
});

export const updateCommentSchema = z.object({
  task_id: z.string().min(1, "task_id es requerido"),
  user_id: z.string().min(1, "user_id es requerido"),
  content: z.string().trim().min(1, "content es requerido").max(500),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;
