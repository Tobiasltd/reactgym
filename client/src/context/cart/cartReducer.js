import {
  GET_CART,
  ADD_CART,
  DELETE_CART,
  MINUS_ONE,
  PLUS_ONE,
  OPEN_CART,
  CLOSE_CART,
  CART_ERROR,
  SET_LOADING,
} from "../types";

const cartReducer = (state, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    case ADD_CART:
      return {
        ...state,
        cart: [action.payload, ...state.cart],
        loading: false,
      };
    case PLUS_ONE:
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    case MINUS_ONE:
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    case DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== action.payload),
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case OPEN_CART:
      return {
        ...state,
        cartmodal: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        cartmodal: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default cartReducer;
