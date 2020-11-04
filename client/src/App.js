import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";

import Home from "./components/pages/Home";
import Reservation from "./components/pages/Reservation";
import Clubs from "./components/pages/Clubs";
import Shop from "./components/pages/Shop";
import Blog from "./components/pages/Blog";
import Employees from "./components/pages/Employees";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import PrivateRoute from "./components/routing/PrivateRoute";

import ReservationState from "./context/reservation/ReservationState";
import RosterState from "./context/roster/RosterState";
import ProductState from "./context/product/ProductState";
import CartState from "./context/cart/CartState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <RosterState>
        <ReservationState>
          <ProductState>
            <CartState>
              <AlertState>
                <Router>
                  <Fragment>
                    <Navbar />
                    <div className="container">
                      <Alerts />
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute
                          exact
                          path="/reservation"
                          component={Reservation}
                        />
                        <PrivateRoute exact path="/shop" component={Shop} />
                        <Route exact path="/clubs" component={Clubs} />
                        <Route exact path="/blog" component={Blog} />
                        <Route exact path="/employees" component={Employees} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                      </Switch>
                    </div>
                  </Fragment>
                </Router>
              </AlertState>
            </CartState>
          </ProductState>
        </ReservationState>
      </RosterState>
    </AuthState>
  );
};

export default App;
