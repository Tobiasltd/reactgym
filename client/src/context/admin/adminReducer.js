import {
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const adminReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAdmin: true,
        loading: false,
        admin: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("adminToken", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAdmin: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("adminToken");
      return {
        ...state,
        adminToken: null,
        isAdmin: false,
        loading: false,
        admin: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default adminReducer;
