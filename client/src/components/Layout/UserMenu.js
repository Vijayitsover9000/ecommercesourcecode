import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
      <h4>Dashboard</h4>
      <ul className="list-group">
        <NavLink to="/dashboard/user/profile" className="list-group-item">
          Profile
        </NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item">
          Orders
        </NavLink>
      </ul>
      </div>
    </>
  );
};

export default UserMenu;
