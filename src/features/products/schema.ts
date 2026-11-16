import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  category: z.string(),
  stock: z.number().int().nonnegative(),
  price: z.number().nonnegative(),
});

export type Product = z.infer<typeof productSchema>;
