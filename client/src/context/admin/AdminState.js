import React, { useReducer } from "react";
import axios from "axios";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
import setAdminToken from "../../utils/setAdminToken";
import {
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AdminState = (props) => {
  const initialState = {
    adminToken: localStorage.getItem("adminToken"),
    isAdmin: null,
    loading: true,
    admin: null,
    error: null,
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Load Admin
  const loadAdmin = async () => {
    setAdminToken(localStorage.adminToken);
    try {
      const res = await axios.get("/api/authadmins");

      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login Admin
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/authadmins", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadAdmin();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AdminContext.Provider
      value={{
        adminToken: state.adminToken,
        isAdmin: state.isAdmin,
        loading: state.loading,
        admin: state.admin,
        error: state.error,
        loadAdmin,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
