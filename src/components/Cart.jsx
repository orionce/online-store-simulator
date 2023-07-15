import { useProductContext } from "../contex/useProductContext";
import { useEffect, useState } from "react";
import { BsFillXSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, deleteItem, setCurrency } = useProductContext();
  const [totalMount, setTotalMount] = useState(0);

  // const tax = (totalMount / 100) * 13;
  const shippingCost = 4.75;

  useEffect(() => {
    if (cart.length) {
      let totals = cart.map((a) => a.price * a.quantity);
      let mount = parseFloat(totals.reduce((a, b) => a + b));
      setTotalMount(mount);
    }
  }, [cart]);

  return (
    <div className="shoppingCart">
      {cart.length === 0 ? (
        <div className="shoppingNotice t-center">
          <h3 className="">Your Shopping Cart is empty!</h3>
          <p>Add some products to shopping cart.</p>
          <Link className="btn" to="/">
            Shop
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
                    <img src={product.thumbnail} width="70px" />
                  </td>
                  <td>{product.title}</td>
                  <td>{`$ ${setCurrency(product.price)}`}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {`$ ${setCurrency(product.price * product.quantity)}`}
                  </td>
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
                  <td>{`$ ${setCurrency(totalMount)}`}</td>
                </tr>
                <tr className="cart-subtotal">
                  <td>Shipping cost:</td>
                  <td>{`$ ${setCurrency(shippingCost)}`}</td>
                </tr>
                <tr>
                  <td>TOTAL:</td>
                  <td>{`$ ${setCurrency(totalMount + shippingCost)}`}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className="btn totalBtn">BUY NOW</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
