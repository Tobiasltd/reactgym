import React, { useContext } from "react";
import PropTypes from "prop-types";
import CartContext from "../../context/cart/cartContext";

const CartItem = ({ product, plusIcon, minusIcon, trashIcon }) => {
  const cartContext = useContext(CartContext);
  const { plusOne, minusOne, deleteCart } = cartContext;

  const { name, price, quantity } = product;

  const plus = () => {
    plusOne(product);
  };

  const minus = () => {
    minusOne(product);
  };

  const trash = () => {
    deleteCart(product);
  };

  return (
    <div className="text-center grid-4 border-bottom-secondary my-2">
      <div className="w-80">{name}</div>
      <div>€ {price}</div>
      <div>
        {quantity > 1 && <i onClick={minus} className={minusIcon}></i>}
        <span className="mx25 d-inline">{quantity}</span>
        <i onClick={plus} className={plusIcon}></i>
      </div>
      <div>
        <i onClick={trash} className={trashIcon}></i>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  plusIcon: PropTypes.string,
  minusIcon: PropTypes.string,
  trashIcon: PropTypes.string,
};

CartItem.defaultProps = {
  plusIcon: "fas fa-plus pointer",
  minusIcon: "fas fa-minus pointer",
  trashIcon: "fas fa-trash pointer",
};

export default CartItem;
