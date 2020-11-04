import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/admin/adminContext";
import EmployeesContext from "../../context/employees/employeesContext";
import BlogContext from "../../context/blog/blogContext";
import RosterContext from "../../context/roster/rosterContext";
import ProductContext from "../../context/product/productContext";
import Blogs from "../employees/blogs/Blogs";
import Products from "../employees/shop/Products";
import Rosters from "../employees/rosters/Rosters";

const Employees = () => {
  const adminContext = useContext(AdminContext);
  const employeesContext = useContext(EmployeesContext);
  const blogContext = useContext(BlogContext);
  const rosterContext = useContext(RosterContext);
  const productContext = useContext(ProductContext);

  const { loadAdmin } = adminContext;
  const { setDashboard, dashboard } = employeesContext;

  useEffect(() => {
    loadAdmin();

    // eslint-disable-next-line
  }, []);

  const onClick = (e) => {
    setDashboard(e.target.value);
  };

  let shopPage,
    blogPage,
    reservationPage = false;

  switch (dashboard) {
    case "Shop":
      shopPage = true;
      break;
    case "Reservations":
      reservationPage = true;
      break;
    case "Blogs":
      blogPage = true;
      break;
    default:
      shopPage = false;
      blogPage = false;
      reservationPage = false;
      break;
  }

  return (
    <div>
      <h1 className="text-center my-2">Employee Dashboard</h1>
      <div className="my-2 text-center">
        <button
          onClick={onClick}
          value="Reservations"
          className="btn btn-primary"
        >
          Reservations
        </button>
        <button onClick={onClick} value="Shop" className="btn btn-secondary">
          Shop
        </button>
        <button onClick={onClick} value="Blogs" className="btn btn-offcolor">
          Blogs
        </button>
      </div>
      {blogPage && <Blogs />}
      {shopPage && <Products />}
      {reservationPage && <Rosters />}
    </div>
  );
};

export default Employees;
