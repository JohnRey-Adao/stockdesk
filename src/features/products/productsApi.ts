import { z } from "zod";
import { apiPage } from "@/lib/api";
import { productSchema } from "./schema";
import type { Product } from "./schema";

export const PAGE_SIZE = 5;

export interface ProductsPageResult {
  items: Product[];
  total: number;
}

export async function fetchProducts(page: number): Promise<ProductsPageResult> {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(PAGE_SIZE),
    _sort: "id",
    _order: "asc",
  });

  const { data, total } = await apiPage<unknown>(`/products?${params}`);

  return { items: z.array(productSchema).parse(data), total };
}
