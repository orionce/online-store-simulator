import { useRef } from "react";
import { useProductContext } from "../contex/useProductContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { addToCart, setCurrency, getSlug } = useProductContext();

  // Capture quantity value of products to buy
  const getQuantity = useRef();

  return (
    <>
      <div className="imageProduct">
        <Link to={`/product/${getSlug(product.title)}-${product.id}`}>
          <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
          />
        </Link>
      </div>
      <div className="description">
        <Link to={`/product/${product.title}`}>
          <h3 className="card-title">{product.title}</h3>
        </Link>
        <h4>{setCurrency(product.price)}</h4>
        <p className="card-text">{product.description}</p>
      </div>
      <span className="stock">
        <span>Stock: </span>
        {product.stock === 0 ? (
          <span className="errorColor">out of stock</span>
        ) : product.stock > 0 && product.stock < 3 ? (
          <span className="errorColor">only {product.stock} left</span>
        ) : (
          product.stock
        )}
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
            if (product.stock === 0) {
              null;
            } else {
              addToCart(product, getQuantity, product.id);
            }
          }}
        >
          <div>
            <p>Add to cart</p>
            <p>
              <span>
                <AiOutlineShoppingCart />
              </span>
            </p>
          </div>
        </button>
      </div>
    </>
  );
};

export default Product;
