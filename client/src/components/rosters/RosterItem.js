import React, { useContext } from "react";
import ReservationContext from "../../context/reservation/reservationContext";
import RosterContext from "../../context/roster/rosterContext";
import AlertContext from "../../context/alert/alertContext";
import PropTypes from "prop-types";

const RosterItem = ({ roster }) => {
  const reservationContext = useContext(ReservationContext);
  const alertContext = useContext(AlertContext);
  const rosterContext = useContext(RosterContext);

  const { addReservation, reservations } = reservationContext;
  const { updateRoster } = rosterContext;
  const { setAlert } = alertContext;

  const { location, weekday, time, spots, _id } = roster;

  let sort;
  switch (weekday) {
    case "Monday":
      sort = 1;
      break;
    case "Tuesday":
      sort = 2;
      break;
    case "Wednesday":
      sort = 3;
      break;
    case "Thursday":
      sort = 4;
      break;
    case "Friday":
      sort = 5;
      break;
    case "Saturday":
      sort = 6;
      break;
    case "Sunday":
      sort = 7;
      break;
    default:
      sort = 1;
      break;
  }

  const reservation = {
    location,
    weekday,
    time,
    sort,
  };

  let updatedRoster = {
    id: _id,
    location,
    weekday,
    time,
    spots: spots - 1,
  };

  const onClick = () => {
    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].weekday === weekday) {
        setAlert("You can only have one reservation per weekday", "danger");
        return;
      }
    }
    addReservation(reservation);
    updateRoster(updatedRoster);
  };

  return (
    <div className="card bg-white grid-3">
      <li>
        <span className="bold"></span> {time}{" "}
      </li>
      <li>
        <span className="bold"> Spots left: </span> {spots}
      </li>
      {spots !== 0 ? (
        <button onClick={onClick} className="btn-link btn-reservation">
          Make Reservation
        </button>
      ) : (
        <li>Full</li>
      )}
    </div>
  );
};

RosterItem.propTypes = {
  roster: PropTypes.object.isRequired,
};

export default RosterItem;
