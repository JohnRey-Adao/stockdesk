import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["admin", "staff"]),
});

export type User = z.infer<typeof userSchema>;
export type Role = User["role"];
