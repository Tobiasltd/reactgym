import React, { Fragment, useContext, useEffect } from "react";
import ReservationItem from "./ReservationItem";
import ReservationContext from "../../context/reservation/reservationContext";
import Spinner from "../layout/Spinner";

const Reservations = () => {
  const reservationContext = useContext(ReservationContext);
  const { reservations, loading, getReservations } = reservationContext;

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line
  }, []);

  if (reservations === [] && !loading) {
    return <h3 className="mt-5">You have no current reservations</h3>;
  }
  return (
    <Fragment>
      <div>
        <h1 id="your-reservations" className="my-2">
          YOUR RESERVATIONS
        </h1>
        <ul>
          {reservations !== [] && !loading ? (
            reservations.map((reservation) => (
              <ReservationItem
                key={reservation._id}
                reservation={reservation}
              />
            ))
          ) : (
            <Spinner />
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default Reservations;
