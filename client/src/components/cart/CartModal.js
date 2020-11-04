import React, { useContext, useEffect } from "react";
import CartContext from "../../context/cart/cartContext";
import CartItem from "../cart/CartItem";
import Spinner from "../layout/Spinner";

const CartModal = () => {
  const cartContext = useContext(CartContext);
  const { getCart, closeCart, cart, loading } = cartContext;

  useEffect(() => {
    getCart();
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    closeCart();
  };

  return (
    <div>
      <div className="modal shopmodal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-secondary text-center">
              <h4>Shopping Cart</h4>
            </div>
            <div className="modal-body">
              {cart && cart !== [] ? (
                cart.map((product) => (
                  <CartItem key={product._id} product={product} />
                ))
              ) : (
                <h4 className="text-center">Shopping cart is empty</h4>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Continue Shopping
              </button>
              <button className="btn btn-secondary" onClick={handleClose}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
