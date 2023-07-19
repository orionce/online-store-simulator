import { useProductContext } from "../contex/useProductContext";
import { BsFillXSquareFill } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, deleteItem, setCurrency, totalMount, getSlug } =
    useProductContext();

  // const tax = (totalMount / 100) * 13;
  const shippingCost = 4.75;

  return (
    <>
      <div className="titlePage">
        <h2>Shopping Cart</h2>
      </div>
      <div className="shoppingCart fluid">
        {cart.length === 0 ? (
          <div className="shoppingNotice t-center">
            <IoCartOutline className="bigCart" />
            <h3 className="">Your Shopping Cart is empty!</h3>
            <p>Add some products to shopping cart.</p>
            <Link className="btn" to="/">
              Return to shop
            </Link>
          </div>
        ) : (
          <div className="cartContainer">
            <table className="styled-table">
              <thead>
                <tr>
                  <th width="40px"></th>
                  <th width="80px"></th>
                  <th width="300px">PRODUCT</th>
                  <th width="100px">PRICE</th>
                  <th width="100px">UNITS</th>
                  <th width="100px">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <button
                        className="delBtn"
                        onClick={() => deleteItem(product.id)}
                      >
                        <BsFillXSquareFill />
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/product/${getSlug(product.title)}-${product.id}`}
                      >
                        <img src={product.thumbnail} width="70px" />
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={`/product/${getSlug(product.title)}-${product.id}`}
                      >
                        {product.title}
                      </Link>
                    </td>
                    <td>{setCurrency(product.price)}</td>
                    <td>{product.quantity}</td>
                    <td>{setCurrency(product.price * product.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="detailsCart">
              <h3>TOTAL CART</h3>
              <table className="">
                <tbody>
                  <tr className="cart-subtotal">
                    <td>Subtotal:</td>
                    <td>{setCurrency(totalMount)}</td>
                  </tr>
                  <tr className="cart-subtotal">
                    <td>Shipping cost:</td>
                    <td>{setCurrency(shippingCost)}</td>
                  </tr>
                  <tr>
                    <td>TOTAL:</td>
                    <td>{setCurrency(totalMount + shippingCost)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Link
                        className="totalBtn"
                        to="/shopping-cart/checkout"
                        state={shippingCost}
                      >
                        Proceed to Checkout
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
