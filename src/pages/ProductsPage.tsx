import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { ProductsTable } from "@/components/organisms/ProductsTable/ProductsTable";
import { PAGE_SIZE } from "@/features/products/productsApi";
import { useProducts } from "@/features/products/useProducts";
import "./ProductsPage.scss";

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, isFetching, refetch } = useProducts(page);

  if (isPending) {
    return (
      <section>
        <h1>Products</h1>
        <p role="status">Loading products…</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h1>Products</h1>
        <div className="products-page__error" role="alert">
          <p>We could not load the products. Check that the API is running.</p>
          <Button onClick={() => refetch()}>Try again</Button>
        </div>
      </section>
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  return (
    <section>
      <h1>Products</h1>
      {data.total === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div aria-busy={isFetching}>
          <ProductsTable items={data.items} />
          <div className="products-page__footer">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
