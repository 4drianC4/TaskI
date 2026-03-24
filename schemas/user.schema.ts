import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Email no valido").min(5).max(255),
  name: z.string().trim().min(2).max(80).optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
