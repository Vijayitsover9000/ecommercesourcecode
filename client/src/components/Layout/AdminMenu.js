import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center position-fixed top-40 start-10 h-20 w-30 overflow-hidden">
      <h4>Admin Panel</h4>
      <ul className="list-group">
        <NavLink to="/dashboard/admin/create-category" className="list-group-item">
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item">
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item">
          Products
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item">
          Users
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="list-group-item">
          Orders
        </NavLink>
        
      </ul>
      </div>
    </>
  );
};

export default AdminMenu;
