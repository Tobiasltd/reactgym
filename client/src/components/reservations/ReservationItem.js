import React, { useContext } from "react";
import ReservationContext from "../../context/reservation/reservationContext";
import RosterContext from "../../context/roster/rosterContext";
import PropTypes from "prop-types";

const ReservationItem = ({ reservation }) => {
  const reservationContext = useContext(ReservationContext);
  const { deleteReservation } = reservationContext;

  const rosterContext = useContext(RosterContext);
  const { updateRoster } = rosterContext;

  const { location, weekday, time, _id } = reservation;

  let updatedRoster = {
    location,
    weekday,
    time,
  };

  const onClick = () => {
    deleteReservation(_id);
    updateRoster(updatedRoster);
  };

  return (
    <div className="card bg-dark grid-4">
      <li>{location}</li>
      <li>{weekday}</li>
      <li>{time}</li>
      <i onClick={onClick} className="ml-1 fas fa-trash"></i>
    </div>
  );
};

ReservationItem.propTypes = {
  reservation: PropTypes.object.isRequired,
};

export default ReservationItem;
