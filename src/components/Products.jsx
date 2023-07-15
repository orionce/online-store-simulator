import Filters from "../components/Filters";
import { useProductContext } from "../contex/useProductContext";
import Product from "./Product";

function Products() {
  const { filtered } = useProductContext();

  return (
    <div className="products fluid">
      <Filters />
      {filtered?.length === 0 ? (
        <h2>No products found.</h2>
      ) : (
        <ul>
          {filtered?.map((product) => (
            <li key={product.id}>
              <Product product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
