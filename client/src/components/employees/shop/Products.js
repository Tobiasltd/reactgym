import React, { Fragment, useContext, useEffect } from "react";
import ProductItem from "./ProductItem";
import ProductView from "./ProductView";
import ProductContext from "../../../context/product/productContext";
import Spinner from "../../layout/Spinner";

const Products = () => {
  const productContext = useContext(ProductContext);
  const { products, getProducts, product, loading } = productContext;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [product]);

  return (
    <Fragment>
      <div className="mt-2">
        <h1 className="my-2 text-center">Our Products</h1>

        {products !== null && !loading && !product ? (
          <div className="grid-3 my-5">
            {products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : product ? (
          <ProductView key={product._id} product={product} />
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

export default Products;
