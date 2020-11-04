import React, { Fragment, useContext, useEffect } from "react";
import RosterItem from "./RosterItem";
import RosterContext from "../../context/roster/rosterContext";
import Spinner from "../layout/Spinner";

const Rosters = () => {
  const rosterContext = useContext(RosterContext);
  const {
    rosters,
    getRosters,
    setLocation,
    setWeekday,
    loading,
    location,
    weekday,
  } = rosterContext;

  useEffect(() => {
    getRosters(weekday, location);
    // eslint-disable-next-line
  }, [weekday, location]);

  const daySwitch = (e) => {
    setWeekday(e.target.value);
  };

  const locationSwitch = (e) => {
    setLocation(e.target.value);
  };

  return (
    <Fragment>
      <div>
        <h1 className="my-2">MAKE A NEW RESERVATION</h1>
        <div>
          <select onChange={daySwitch} className="dropdown mr-2">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <select onChange={locationSwitch} className="dropdown">
            <option value="Utrecht">Utrecht</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="Groningen">Groningen</option>
          </select>
        </div>
        <ul className="my-5">
          {rosters !== null && !loading ? (
            rosters.map((roster) => (
              <RosterItem key={roster._id} roster={roster} />
            ))
          ) : (
            <Spinner />
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default Rosters;
