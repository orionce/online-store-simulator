import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../contex/useProductContext";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsChevronRight, BsChevronLeft, BsCart3 } from "react-icons/bs";

import { useEffect, useRef, useState } from "react";

const ProductDetail = () => {
  const { addToCart, setCurrency, filtered, getSlug } = useProductContext();
  const [product, setProduct] = useState();
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();

  const getQuantity = useRef();
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (filtered?.length) {
      getProduct();
    }
  }, [filtered, params]);

  function setIndex(prd) {
    const index = filtered?.indexOf(prd);
    setPrev(index - 1);
    setNext(index + 1);
    return index;
  }

  const getProduct = () => {
    let splitString = params.productName.split("-");
    let id = splitString[splitString.length - 1];
    const prod = filtered?.find((item) => item.id === parseInt(id));
    setIndex(prod);
    setProduct(prod);
  };

  // // Get index of product
  const navigation = (action) => {
    const index = setIndex(product);
    if (index >= 0 && index <= filtered.length) {
      const next = filtered[index + action];
      const url = `/product/${getSlug(next.title)}-${next.id}`;
      navigate(url);
    }
  };

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
                    {prev >= 0 ? (
                      <span>
                        <BsChevronLeft onClick={() => navigation(-1)} />
                      </span>
                    ) : null}
                    <Link to="/">
                      <AiOutlineAppstore />
                    </Link>
                    {next < filtered.length ? (
                      <span>
                        <BsChevronRight onClick={() => navigation(1)} />
                      </span>
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
