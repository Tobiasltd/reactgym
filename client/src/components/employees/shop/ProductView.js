import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/auth/authContext";
import ProductContext from "../../../context/product/productContext";
import CartContext from "../../../context/cart/cartContext";
import PropTypes from "prop-types";
import Weightvest from "./productimg/Weightvest.jpg";
import Mask from "./productimg/Mask.jpg";
import Sweater from "./productimg/Sweater.jpg";
import Tshirt from "./productimg/Tshirt.jpg";
import Tshirt2 from "./productimg/Tshirt2.jpg";
import Kettlebells from "./productimg/Kettlebells.jpg";

const ProductView = ({ product }) => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);

  const { isAuthenticated, routeShop } = authContext;
  const { addCart, openCart } = cartContext;
  const { clearView } = productContext;

  const { name, price, img, description } = product;

  let imgsrc;
  switch (img) {
    case "Weightvest":
      imgsrc = Weightvest;
      break;
    case "Mask":
      imgsrc = Mask;
      break;
    case "Sweater":
      imgsrc = Sweater;
      break;
    case "Tshirt":
      imgsrc = Tshirt;
      break;
    case "Tshirt2":
      imgsrc = Tshirt2;
      break;
    case "Kettlebells":
      imgsrc = Kettlebells;
      break;
    default:
      imgsrc = Weightvest;
      break;
  }

  const clear = () => {
    clearView();
  };

  const editProduct = () => {
    console.log("Product Edited");
  };
  const deleteProduct = () => {
    console.log("Product deleted");
  };

  return (
    <div className=" grid-2 my-2">
      <img style={{ width: "400px", height: "400px" }} src={imgsrc} alt="" />
      <div>
        {" "}
        <div>
          <h3 className="d-inline my-2">Name:</h3> {name}
        </div>
        <div>
          <h3 className="d-inline my-2">Description:</h3> <p>{description}</p>
        </div>
        <div>
          <h3 className="d-inline my-2">Price: </h3>€ {price}
        </div>
        <div className="grid-2">
          <button onClick={editProduct} className="btn btn-secondary mb-2 mr-3">
            Edit
          </button>
          <button
            onClick={deleteProduct}
            className="btn btn-offcolor mb-2 mr-3"
          >
            Delete
          </button>

          <button onClick={clear} className="btn btn-primary w-175">
            Return to products
          </button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductView;
