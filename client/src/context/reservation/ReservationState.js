import React, { useReducer } from "react";
import axios from "axios";
import ReservationContext from "./reservationContext";
import reservationReducer from "./reservationReducer";
import {
  SET_LOADING,
  ADD_RESERVATION,
  DELETE_RESERVATION,
  GET_RESERVATIONS,
  RESERVATION_ERROR,
} from "../types";

const ReservationState = (props) => {
  const initialState = {
    reservations: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(reservationReducer, initialState);

  // Get reservations
  const getReservations = async () => {
    try {
      setLoading();
      const res = await axios.get("/api/reservations");
      dispatch({
        type: GET_RESERVATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: RESERVATION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Reservation
  const addReservation = async (reservation) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading();
      const res = await axios.post("/api/reservations", reservation, config);
      dispatch({ type: ADD_RESERVATION, payload: res.data });
    } catch (err) {
      dispatch({
        type: RESERVATION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Reservation
  const deleteReservation = async (id) => {
    try {
      setLoading();
      await axios.delete(`/api/reservations/${id}`);
      dispatch({
        type: DELETE_RESERVATION,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: RESERVATION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //  Set loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations: state.reservations,
        loading: state.loading,
        getReservations,
        addReservation,
        deleteReservation,
        setLoading,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationState;
