import React, { Fragment, useContext, useEffect } from "react";
import Reservations from "../reservations/Reservations";
import Rosters from "../rosters/Rosters";
import AuthContext from "../../context/auth/authContext";

const Reservation = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <Fragment>
        <Rosters />
      </Fragment>
      <Fragment>
        <Reservations />
      </Fragment>
    </div>
  );
};

export default Reservation;
