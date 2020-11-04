import {
  SET_LOADING,
  GET_RESERVATIONS,
  ADD_RESERVATION,
  RESERVATION_ERROR,
  DELETE_RESERVATION,
} from "../types";

// Whenever the useReducer hook is called in /context/ReservationState
// const [state, dispatch] = useReducer(reservationReducer, initialState);
// State refers to the second Y value passed in useReducer(x, y)
// Dispatch refers to the first value X passed in useReducer(x, y)
// State is therefore an passed object, dispatch is a passed function
// The dispatch function calls the function in this file
// Example: ADD_RESERVATION this type is added as the first parameter in
//   const addReservation = (reservation) => {
//   reservation.id = uuidv4();
//   dispatch({ ADD_RESERVATION, payload: reservation });
// };
// This function resides in /context/ReservationState
// The first param in dispatch is the action.type, so that the switch statement below here knows which switch case to execute. When there is no type, like with the initialstate function, the default case is executed.
// The second param in dispatch is action.payload
//  In the return statement of ADD_RESERVATION, state... is first spread out, because it is 'immutable' meaning you can't just edit state from the get go
// When it is spread out, reservation is added to the state, but first action.payload is added to state.reservation: meaning the passed in reservation is added to the reservation state (which contains multiple reservations)

const reservationReducer = (state, action) => {
  switch (action.type) {
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
        loading: false,
      };
    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [action.payload, ...state.reservations],
        loading: false,
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation._id !== action.payload
        ),
        loading: false,
      };
    case RESERVATION_ERROR:
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

export default reservationReducer;
