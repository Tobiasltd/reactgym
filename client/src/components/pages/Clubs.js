import React from "react";

const Clubs = () => {
  return (
    <div>
      <div className="my-3 text-center">
        <h1>Visit one of our clubs to get a tour and sign up.</h1>
      </div>
      <div className="grid-3 clubgrid">
        <div className="clubcontainer">
          <img
            src="https://images.unsplash.com/photo-1597350710483-b1ce5259182e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            alt=""
          />
          <div className="centeredtext">
            <h2>Utrecht</h2>
          </div>
          <div className="texthover">
            <h4>Utrecht</h4>
            <h4>Stadsplateau 1</h4>
            <h4>030 286 0000</h4>
          </div>
          <div className="overlay"></div>
          <div className="overlaydark"></div>
        </div>
        <div className="clubcontainer">
          <img
            src="https://images.unsplash.com/photo-1519475889208-0968e5438f7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1054&q=80"
            alt=""
          />
          <div className="centeredtext">
            <h2>Amsterdam</h2>
          </div>
          <div className="texthover">
            <h4>Amsterdam</h4>
            <h4>Amstel 1</h4>
            <h4>020 555 5837</h4>
          </div>
          <div className="overlay"></div>
          <div className="overlaydark"></div>
        </div>
        <div className="clubcontainer">
          <img
            src="https://images.pexels.com/photos/135161/pexels-photo-135161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
          <div className="centeredtext">
            <h2>Groningen</h2>
          </div>
          <div className="texthover">
            <h4>Groningen</h4>
            <h4>Radesingel 6</h4>
            <h4>050 367 7000</h4>
          </div>
          <div className="overlay"></div>
          <div className="overlaydark"></div>
        </div>
      </div>
    </div>
  );
};

export default Clubs;
