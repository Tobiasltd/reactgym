import React, { useContext } from "react";
import ReservationContext from "../../../context/reservation/reservationContext";
import RosterContext from "../../../context/roster/rosterContext";
import AlertContext from "../../../context/alert/alertContext";
import PropTypes from "prop-types";

const RosterItem = ({ roster }) => {
  const reservationContext = useContext(ReservationContext);
  const alertContext = useContext(AlertContext);
  const rosterContext = useContext(RosterContext);

  const { addReservation, reservations } = reservationContext;
  const { updateRoster } = rosterContext;
  const { setAlert } = alertContext;

  const { location, weekday, time, spots, _id } = roster;

  const editRoster = () => {
    console.log("Roster Edited");
  };

  return (
    <div className="card bg-white grid-3">
      <li>
        <span className="bold"></span> {time}{" "}
      </li>
      <li>
        <span className="bold"> Spots left: </span> {spots}
      </li>
      <button onClick={editRoster} className="btn btn-offcolor">
        Edit
      </button>
    </div>
  );
};

RosterItem.propTypes = {
  roster: PropTypes.object.isRequired,
};

export default RosterItem;
