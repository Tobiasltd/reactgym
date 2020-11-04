import React, { useReducer } from "react";
import axios from "axios";
import ProductContext from "./productContext";
import productReducer from "./productReducer";
import {
  SET_LOADING,
  GET_PRODUCTS,
  VIEW_PRODUCT,
  CLEAR_VIEW,
  PRODUCT_ERROR,
} from "../types";

const ProductState = (props) => {
  const initialState = {
    products: [],
    loading: false,
    product: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get products
  const getProducts = async () => {
    try {
      setLoading();
      const res = await axios.get("/api/products");
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // View product
  const viewProduct = (product) => {
    setLoading();
    dispatch({ type: VIEW_PRODUCT, payload: product });
  };

  const clearView = () => {
    dispatch({
      type: CLEAR_VIEW,
    });
  };

  //  Set loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        product: state.product,
        loading: state.loading,
        getProducts,
        viewProduct,
        clearView,
        setLoading,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
