import { z } from "zod";

export const createColumnSchema = z.object({
  board_id: z.string().min(1),
  name: z.string().trim().min(1).max(80),
  order: z.number().int().min(0),
});

export const patchColumnSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  order: z.number().int().min(0).optional(),
  is_done: z.boolean().optional(),
});

export const putColumnSchema = z.object({
  board_id: z.string().min(1),
  name: z.string().trim().min(1).max(80),
  order: z.number().int().min(0),
  is_done: z.boolean(),
});

export type CreateColumnSchema = z.infer<typeof createColumnSchema>;
export type PatchColumnSchema = z.infer<typeof patchColumnSchema>;
export type PutColumnSchema = z.infer<typeof putColumnSchema>;