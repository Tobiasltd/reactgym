import React, { useReducer } from "react";
import axios from "axios";
import RosterContext from "./rosterContext";
import rosterReducer from "./rosterReducer";
import {
  SET_LOADING,
  SET_LOCATION,
  SET_WEEKDAY,
  GET_ROSTERS,
  UPDATE_ROSTER,
  ROSTER_ERROR,
} from "../types";

const RosterState = (props) => {
  const initialState = {
    rosters: null,
    location: "Utrecht",
    weekday: "Monday",
    loading: false,
  };

  const [state, dispatch] = useReducer(rosterReducer, initialState);

  const getRosters = async (weekday, location) => {
    try {
      setLoading();
      const res = await axios.get("/api/rosters", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          location,
          weekday,
        },
      });
      dispatch({
        type: GET_ROSTERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ROSTER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update roster
  const updateRoster = async (updatedRoster) => {
    const roster = updatedRoster;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading();
      let res;
      if (roster.id) {
        res = await axios.put(`/api/rosters/${roster.id}`, roster, config);
      } else {
        res = await axios.put(`/api/rosters/${roster.weekday}`, roster, config);
      }

      dispatch({ type: UPDATE_ROSTER, payload: res.data });
    } catch (err) {
      dispatch({
        type: ROSTER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Set roster location
  const setLocation = (location) => {
    dispatch({ type: SET_LOCATION, payload: location });
  };

  // Set roster weekday
  const setWeekday = (weekday) => {
    dispatch({ type: SET_WEEKDAY, payload: weekday });
  };

  //  Set loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <RosterContext.Provider
      value={{
        rosters: state.rosters,
        location: state.location,
        weekday: state.weekday,
        loading: state.loading,
        getRosters,
        updateRoster,
        setLocation,
        setWeekday,
        setLoading,
      }}
    >
      {props.children}
    </RosterContext.Provider>
  );
};

export default RosterState;
