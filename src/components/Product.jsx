import { useRef } from "react";
import { useProductContext } from "../contex/useProductContext";

const Product = ({ product }) => {
  const { addToCart, setCurrency } = useProductContext();

  // Capture quantity value of products to buy
  const getQuantity = useRef();

  return (
    <>
      <div>
        <img src={product.thumbnail} className="card-img-top" alt="..." />
      </div>
      <div className="description">
        <h3 className="card-title">{product.title}</h3>
        <h4>{`$ ${setCurrency(product.price)}`}</h4>
        <p className="card-text">{product.description}</p>
      </div>
      <span className="stock">
        <strong>Stock:</strong> {product.stock}
      </span>

      <div className="addCart">
        <input
          id={`input-${product.id}`}
          type="number"
          min="1"
          max={product.stock}
          defaultValue="1"
          ref={getQuantity}
        />
        <button
          className="btn"
          onClick={() => {
            addToCart(product, getQuantity, product.id);
          }}
        >
          Add to cart
        </button>
      </div>
    </>
  );
};

export default Product;
