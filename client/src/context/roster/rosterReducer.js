// import { UPDATE_ROSTER } from "../types";
import {
  SET_LOADING,
  GET_ROSTERS,
  UPDATE_ROSTER,
  SET_LOCATION,
  SET_WEEKDAY,
  ROSTER_ERROR,
} from "../types";

const rosterReducer = (state, action) => {
  switch (action.type) {
    case GET_ROSTERS:
      return {
        ...state,
        rosters: action.payload,
        loading: false,
      };
    case UPDATE_ROSTER:
      return {
        ...state,
        rosters: action.payload,
        loading: false,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SET_WEEKDAY:
      return {
        ...state,
        weekday: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ROSTER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rosterReducer;
