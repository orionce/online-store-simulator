import { Link, useParams } from "react-router-dom";
import { useProductContext } from "../contex/useProductContext";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsChevronRight, BsChevronLeft, BsCart3 } from "react-icons/bs";

import { useRef } from "react";

const ProductDetail = () => {
  const { addToCart, setCurrency, filtered } = useProductContext();
  const getQuantity = useRef();

  let params = useParams();

  // Get product from url title
  const prod = filtered?.filter((item) => item.title === params.productName);
  const product = prod[0];

  // Get index of product
  const GetIndex = filtered?.indexOf(product);

  // declare indexes of previus and next products
  let prevProduct = filtered[GetIndex - 1];
  let nextProduct = filtered[GetIndex + 1];

  return (
    <>
      {product ? (
        <div>
          <div className="titlePage">
            <h2>{product.title}</h2>
          </div>

          <div className="productViewContent fluid">
            <div className="productView">
              <div className="ImageViews">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="productDetails">
                <div className="breadcrumbs">
                  <ul className="flex">
                    <li>
                      <Link to="/">Store </Link> /
                    </li>
                    <li>
                      {" "}
                      <Link to={`../category/${product.category}`}>
                        {product.category}
                      </Link>{" "}
                      /
                    </li>
                    <li> {product.title}</li>
                  </ul>
                  <div className="prev-next">
                    {GetIndex > 0 ? (
                      <Link to={`/product/${prevProduct.title}`}>
                        <BsChevronLeft />
                      </Link>
                    ) : null}
                    <Link to="/">
                      <AiOutlineAppstore />
                    </Link>
                    {GetIndex + 1 < filtered.length ? (
                      <Link to={`/product/${nextProduct.title}`}>
                        <BsChevronRight />
                      </Link>
                    ) : null}
                  </div>
                </div>
                <h2 className="productTitle">{product.title}</h2>
                <h3 className="productPrice">{setCurrency(product.price)}</h3>

                <p className="productDescription">
                  <span>Features: </span>
                  <br />
                  {product.description}
                </p>
                <p className="productStock">
                  <span>Stock: </span>
                  {product.stock === 0 ? (
                    <span className="errorColor">out of stock</span>
                  ) : (
                    product.stock
                  )}
                </p>
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
                    <div>
                      <p>Add to cart</p>
                      <p>
                        <span>
                          <BsCart3 />
                        </span>
                      </p>
                    </div>
                  </button>
                </div>
                <ul className="otherDetails">
                  <li>
                    <span>Brand:</span> <Link>{product.brand}</Link>
                  </li>
                  <li>
                    <span>Category:</span>{" "}
                    <Link to={`../category/${product.category}`}>
                      {product.category}
                    </Link>
                  </li>
                  <li>
                    <span>Rating:</span> {product.rating}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetail;
