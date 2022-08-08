import React from "react";
import { Outlet, NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      Dashboard
      {/* <nav>
        <NavLink to="overview">overview of dashboard</NavLink>
        <NavLink to="AddUser">Add new user here</NavLink>
        <NavLink to="ShowUserList">List all Users here</NavLink>
      </nav> */}
      <Outlet />
    </div>
  );
}

export default Dashboard;
