import { SET_DASHBOARD } from "../types";

const employeesReducer = (state, action) => {
  switch (action.type) {
    case SET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default employeesReducer;
