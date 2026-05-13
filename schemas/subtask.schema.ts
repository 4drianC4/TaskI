import { z } from "zod";

export const createSubtaskSchema = z.object({
  title: z.string().trim().min(2).max(80),
  description: z.string().trim().min(5).max(255).optional(),
  taskId: z.string().uuid("ID de tarea no valido"),
});

export type CreateSubtaskSchema = z.infer<typeof createSubtaskSchema>;