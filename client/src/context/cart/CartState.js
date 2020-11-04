import React, { useReducer } from "react";
import axios from "axios";
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";
import {
  SET_LOADING,
  GET_CART,
  ADD_CART,
  PLUS_ONE,
  MINUS_ONE,
  DELETE_CART,
  CART_ERROR,
  OPEN_CART,
  CLOSE_CART,
} from "../types";

const CartState = (props) => {
  const initialState = {
    cart: [],
    cartmodal: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Get cart
  const getCart = async () => {
    try {
      setLoading();
      const res = await axios.get("/api/cart");

      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response,
      });
    }
  };

  // Add cart
  const addCart = async (product) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading();
      const res = await axios.post("/api/cart", product, config);

      dispatch({ type: ADD_CART, payload: res.data });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response,
      });
    }
  };

  // Plus one
  const plusOne = async (product) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading();
      await axios.put(`/api/cart/${product._id}/plusone`, config);
      product.quantity++;
      dispatch({ type: PLUS_ONE, payload: product });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response,
      });
    }
  };

  // Minus one
  const minusOne = async (product) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading();
      await axios.put(`/api/cart/${product._id}/minusone`, config);
      product.quantity--;
      dispatch({ type: MINUS_ONE, payload: product });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response,
      });
    }
  };

  // Delete item from cart
  const deleteCart = async (product) => {
    try {
      setLoading();
      await axios.delete(`/api/cart/${product._id}`);
      dispatch({
        type: DELETE_CART,
        payload: product._id,
      });
    } catch (err) {
      dispatch({
        type: CART_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Open Cart
  const openCart = async () => {
    dispatch({
      type: OPEN_CART,
    });
  };
  // Close Cart
  const closeCart = () => {
    dispatch({
      type: CLOSE_CART,
    });
  };
  //  Set loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        cartmodal: state.cartmodal,
        loading: state.loading,
        getCart,
        addCart,
        plusOne,
        minusOne,
        deleteCart,
        setLoading,
        openCart,
        closeCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
