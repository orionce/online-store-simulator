import { useLocation } from "react-router-dom";
import { useProductContext } from "../contex/useProductContext";

const Checkout = () => {
  const { cart, totalMount, setCurrency } = useProductContext();
  const shippingCost = useLocation().state;
  return (
    <>
      <div className="titlePage">
        <h2>Shopping Cart</h2>
      </div>
      <div className="fluid">
        <div className="checkout">
          <h2>YOUR ORDER</h2>
          <table className="checkoutTable">
            <tbody>
              <tr className="cart-subtotal">
                <th colSpan="2">PRODUCT:</th>
                <th width="100px">SUBTOTAL:</th>
              </tr>
              {cart?.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>{setCurrency(product.price * product.quantity)}</td>
                </tr>
              ))}
              <tr className="cart-subtotal">
                <td colSpan="2">Subtotal</td>
                <td>{setCurrency(totalMount)}</td>
              </tr>
              <tr className="cart-subtotal">
                <td colSpan="2">Shipping cost:</td>
                <td>{setCurrency(shippingCost)}</td>
              </tr>
              <tr>
                <td colSpan="2">Total:</td>
                <td>{setCurrency(totalMount + shippingCost)}</td>
              </tr>
              <tr>
                <td colSpan="3">
                  <button className="btn totalBtn">Finish Order</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Checkout;
