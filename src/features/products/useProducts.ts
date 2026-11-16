import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./productsApi";

export function useProducts(page: number) {
  return useQuery({
    queryKey: ["products", { page }],
    queryFn: () => fetchProducts(page),
    placeholderData: keepPreviousData,
  });
}
