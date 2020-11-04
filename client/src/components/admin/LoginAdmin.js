import React, { useState, useContext, useEffect } from "react";
import AdminContext from "../../context/admin/adminContext";
import AlertContext from "../../context/alert/alertContext";

const LoginAdmin = (props) => {
  const alertContext = useContext(AlertContext);
  const adminContext = useContext(AdminContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAdmin } = adminContext;

  useEffect(() => {
    if (isAdmin) {
      props.history.push("/employees");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAdmin, props.history]);

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = admin;

  const onChange = (e) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Employee <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default LoginAdmin;
