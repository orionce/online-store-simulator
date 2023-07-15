import { BsFillCartFill, BsFillCartCheckFill } from "react-icons/bs";
import { useProductContext } from "../contex/useProductContext";

const CartButton = () => {
  const { cart } = useProductContext();

  return (
    <div className="cartBtn">
      <button>
        {cart.length === 0 ? (
          <BsFillCartFill />
        ) : (
          <span className="red">
            <BsFillCartCheckFill />
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;
