import { useParams } from "react-router-dom";
import { useProductContext } from "../contex/useProductContext";
import Product from "./Product";

const Category = () => {
  const { filtered } = useProductContext();
  const params = useParams();
  const categoryProducts = filtered.filter(
    (product) => product.category === params.category
  );

  return (
    <>
      <div className="titlePage">
        <h2>{params.category}</h2>
      </div>
      <div className="products fluid">
        {categoryProducts?.length === 0 ? (
          <h2>No products found.</h2>
        ) : (
          <ul>
            {categoryProducts?.map((product) => (
              <li key={product.id}>
                <Product product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Category;
