import { useLocation, Link } from "react-router-dom";
import { useProductContext } from "../contex/useProductContext";
import { BsFillXSquareFill } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";

const Checkout = () => {
  const { cart, totalMount, setCurrency, deleteItem, finishOrder } =
    useProductContext();
  const shippingCost = useLocation().state;

  return (
    <>
      <div className="titlePage">
        <h2>Shopping Cart - Checkout</h2>
      </div>
      <div className="fluid">
        {cart.length === 0 ? (
          <div className="shoppingNotice t-center">
            <LiaShippingFastSolid className="bigCart" />
            <h3 className="">Thank you for your purchase</h3>
            <p>Your order is on the way.</p>
            <Link className="btn" to="/">
              Keep Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout">
            <h2>YOUR ORDER</h2>
            <div className="table-content">
              <table className="checkoutTable">
                <tbody>
                  <tr className="cart-subtotal border-bottom">
                    <th colSpan={2}>PRODUCT</th>
                    <th width="100px">SUBTOTAL</th>
                  </tr>
                </tbody>
              </table>
              <table className="checkoutTable">
                <tbody>
                  {cart?.map((product) => (
                    <tr key={product.id}>
                      <td width="26px" className="border-bottom">
                        <span
                          className="delBtn"
                          onClick={() => deleteItem(product.id)}
                        >
                          <BsFillXSquareFill />
                        </span>
                      </td>
                      <td width="50px">
                        <img src={product.thumbnail} width="40px" />
                      </td>
                      <td>
                        {product.title} -{" "}
                        <small>{product.quantity} Units</small>
                      </td>
                      <td>{setCurrency(product.price * product.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkoutTable">
                <tbody>
                  <tr className="cart-subtotal border-bottom">
                    <td>
                      <strong>Subtotal</strong>
                    </td>
                    <td className="primary-color">{setCurrency(totalMount)}</td>
                  </tr>
                  <tr className="cart-subtotal  border-bottom">
                    <td>
                      <strong>Shipping cost:</strong>
                    </td>
                    <td>{setCurrency(shippingCost)}</td>
                  </tr>
                  <tr className=" total-mount">
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className="primary-color">
                      <strong>{setCurrency(totalMount + shippingCost)}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button onClick={finishOrder} className="btn totalBtn">
                        Finish Order
                      </button>
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

export default Checkout;
