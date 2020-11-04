import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import CartContext from "../../context/cart/cartContext";
import CartModal from "../cart/CartModal";

const Navbar = ({ title, reacticon, gymicon, usericon, shopicon }) => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  const { getCart, openCart, cartmodal } = cartContext;
  const { isAuthenticated, routeShop } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      getCart();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const shopRoute = () => {
    routeShop();
  };

  const onClick = () => {
    openCart();
  };

  return (
    <div className="border-bottom">
      <div className="navbar">
        <h3 className="my-1">
          <i className={reacticon} /> {title.toUpperCase()}{" "}
          <i className={gymicon} />
        </h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/clubs">Clubs</Link>
          </li>
          <li>
            <Link to="/reservation">Reservation</Link>
          </li>
          <li>
            <Link onClick={shopRoute} to="/shop">
              Shop
            </Link>
          </li>

          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
        </ul>
        <ul>
          <li>
            {" "}
            <Link to="/login">
              <i className={usericon}></i>
            </Link>
          </li>
          <li>
            {" "}
            {isAuthenticated ? (
              <i onClick={onClick} className={shopicon}></i>
            ) : (
              <Link onClick={shopRoute} to="/login">
                <i className={shopicon}></i>
              </Link>
            )}
          </li>
        </ul>
      </div>
      {cartmodal && <CartModal />}
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  reacticon: PropTypes.string,
  gymicon: PropTypes.string,
  usericon: PropTypes.string,
  shopicon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "REACT GYM",
  reacticon: "fab fa-react",
  gymicon: "fas fa-dumbbell",
  usericon: "fas fa-user",
  shopicon: "fas fa-shopping-cart pointer",
};

export default Navbar;
