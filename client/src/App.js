import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import PreFooter from "./components/layout/PreFooter";
import Footer from "./components/layout/Footer";
import Alerts from "./components/layout/Alerts";

import Home from "./components/pages/Home";
import Reservation from "./components/pages/Reservation";
import Clubs from "./components/pages/Clubs";
import Shop from "./components/pages/Shop";
import Blog from "./components/pages/Blog";
import Employees from "./components/pages/Employees";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import LoginAdmin from "./components/admin/LoginAdmin";

import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";

import ReservationState from "./context/reservation/ReservationState";
import RosterState from "./context/roster/RosterState";
import ProductState from "./context/product/ProductState";
import CartState from "./context/cart/CartState";
import BlogState from "./context/blog/BlogState";
import AuthState from "./context/auth/AuthState";
import AdminState from "./context/admin/AdminState";
import EmployeesState from "./context/employees/EmployeesState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";
import setAdminToken from "./utils/setAdminToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (localStorage.adminToken) {
  setAdminToken(localStorage.adminToken);
}

const App = () => {
  return (
    <AuthState>
      <AdminState>
        <EmployeesState>
          <RosterState>
            <ReservationState>
              <ProductState>
                <CartState>
                  <BlogState>
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
                              <PrivateRoute
                                exact
                                path="/shop"
                                component={Shop}
                              />
                              <Route exact path="/clubs" component={Clubs} />
                              <Route exact path="/blog" component={Blog} />
                              <AdminRoute
                                exact
                                path="/employees"
                                component={Employees}
                              />
                              <Route
                                exact
                                path="/register"
                                component={Register}
                              />
                              <Route exact path="/login" component={Login} />
                              <Route
                                exact
                                path="/loginadmin"
                                component={LoginAdmin}
                              />
                            </Switch>
                          </div>
                          <PreFooter />
                          <Footer />
                        </Fragment>
                      </Router>
                    </AlertState>
                  </BlogState>
                </CartState>
              </ProductState>
            </ReservationState>
          </RosterState>
        </EmployeesState>
      </AdminState>
    </AuthState>
  );
};

export default App;
