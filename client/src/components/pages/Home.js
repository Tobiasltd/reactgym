import React from "react";
import { Link } from "react-router-dom";
import home2 from "../pages/img/home2.jpg";
const Home = () => {
  return (
    <div>
      <div className="shopcontainer">
        <img src={home2} alt="" />
        <div className="centeredtext">
          <h1 className="xxx-large">
            <i className="d-block fab fa-react" />
            REACT GYM
          </h1>
        </div>
        <div className="overlay"></div>
      </div>
      <div className="grid-2 my-2">
        <div>
          <h1 className="text-left large letter-spacing-none">
            FITNESS TRANSFORMED
          </h1>
          <p>
            React Gym is more than a place where high performers come to be
            their best.
            <br />
            <br />
            We’ve transformed every aspect of our gym experience to encompass
            integrated digital and in-club offerings to keep you at your
            best—all the time, any time.
            <br />
            <br />
            Visit one of our{" "}
            <Link className="btn-link" to="/clubs">
              Clubs
            </Link>{" "}
            to sign up now.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          alt=""
        />
      </div>
      <div className="grid-2 my-5">
        <h1 className="text-left large letter-spacing-none">
          OUR COVID-19 MEASURES
        </h1>
        <p>
          To ensure your safety and comfort during workouts, we've installed air
          ventilation to combat COVID-19. All personel is required to wear a
          mask at all times.
          <br />
          <br />
          We ask you to keep 1.5 meters distance to keep our gym a safe haven
          for improving fitness and health. Disinfectants are provided for every
          workout station, please wash off your equipment after use.
          <br />
          <br />
          In order to be able to keep 1.5 meters distance, you now have to make
          a reservation in order to be allowed in the gym. Each of our clubs has
          a maximum amount of people allowed at all times, depending on the size
          of the club. See{" "}
          <Link className="btn-link" to="/reservation">
            Reservation
          </Link>{" "}
          for more.
        </p>
      </div>
      <div className="bg-white">
        <h1 className="xx-large letter-spacing-none bold ml-2 mt-2">
          TAKE CHARGE
        </h1>
        <h1 className="xx-large letter-spacing-none bold ml-2">
          STOP MAKING EXCUSES
        </h1>

        <h1 className="x-large letter-spacing-none bold bg-black w-500 ml-2">
          <Link to="/clubs">FIND A CLUB NOW</Link>{" "}
          <i className="fas fa-arrow-right"></i>
        </h1>
      </div>
    </div>
  );
};

export default Home;
