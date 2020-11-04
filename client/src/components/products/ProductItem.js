import React, { useContext } from "react";
import ProductContext from "../../context/product/productContext";
import PropTypes from "prop-types";
import Weightvest from "./productimg/Weightvest.jpg";
import Mask from "./productimg/Mask.jpg";
import Sweater from "./productimg/Sweater.jpg";
import Tshirt from "./productimg/Tshirt.jpg";
import Tshirt2 from "./productimg/Tshirt2.jpg";
import Kettlebells from "./productimg/Kettlebells.jpg";

const ProductItem = ({ product }) => {
  const productContext = useContext(ProductContext);
  const { viewProduct } = productContext;

  const { name, price, img } = product;

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

  const onClick = () => {
    viewProduct(product);
  };
  return (
    <div onClick={onClick} className="text-center pointer">
      <img style={{ width: "200px", height: "200px" }} src={imgsrc} alt="" />
      <div>{name}</div>
      <div>€ {price}</div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
