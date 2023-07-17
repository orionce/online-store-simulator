import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { useProductContext } from "../contex/useProductContext";

const CartButton = () => {
  const { cart } = useProductContext();

  return (
    <div className="cartBtn">
      <button>
        {cart.length === 0 ? (
          <IoCartOutline />
        ) : (
          <span className="red">
            <IoCartSharp />
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;
