import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AdminContext from "../../context/admin/adminContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const adminContext = useContext(AdminContext);
  const { isAdmin, loading } = adminContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAdmin && !loading ? (
          <Redirect to="/loginadmin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
