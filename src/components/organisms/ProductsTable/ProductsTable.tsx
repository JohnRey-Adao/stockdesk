import type { Product } from "@/features/products/schema";
import { formatPrice } from "@/lib/format";
import "./ProductsTable.scss";

const LOW_STOCK = 20;

interface ProductsTableProps {
  items: Product[];
}

export function ProductsTable({ items }: ProductsTableProps) {
  return (
    <div
      className="products-table"
      role="region"
      aria-label="Products table"
      tabIndex={0}
    >
      <table className="products-table__table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col" className="products-table__num">
              Stock
            </th>
            <th scope="col" className="products-table__num">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td className="products-table__num">
                {product.stock}
                {product.stock <= LOW_STOCK && (
                  <span className="products-table__low">Low</span>
                )}
              </td>
              <td className="products-table__num">
                {formatPrice(product.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
