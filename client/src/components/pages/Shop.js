import React, { Fragment, useContext, useEffect } from "react";
import Products from "../products/Products";
import AuthContext from "../../context/auth/authContext";

const Shop = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="shopcontainer">
        <img
          src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=974&q=80"
          alt=""
        />
        <div className="centeredtext">
          <h1 className="xxx-large">THE SHOP</h1>
        </div>
      </div>
      <Fragment>
        <Products />
      </Fragment>
    </div>
  );
};

export default Shop;
