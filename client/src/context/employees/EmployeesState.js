import React, { useReducer } from "react";
import EmployeesContext from "./employeesContext";
import employeesReducer from "./employeesReducer";
import axios from "axios";
import { SET_DASHBOARD, SET_LOADING } from "../types";

const EmployeesState = (props) => {
  const initialState = {
    dashboard: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(employeesReducer, initialState);

  // Set Dashboard
  const setDashboard = (dashboard) => {
    dispatch({
      type: SET_DASHBOARD,
      payload: dashboard,
    });
  };

  //  Set loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <EmployeesContext.Provider
      value={{
        dashboard: state.dashboard,
        loading: state.loading,
        setLoading,
        setDashboard,
      }}
    >
      {props.children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesState;
