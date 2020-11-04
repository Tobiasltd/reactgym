import {
  SET_LOADING,
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  VIEW_PRODUCT,
  CLEAR_VIEW,
} from "../types";

const productReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case VIEW_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case CLEAR_VIEW:
      return {
        ...state,
        product: null,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
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

export default productReducer;
