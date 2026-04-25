import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserMd, FaComments, FaTable, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <FaUserMd />
        <span>CareCRM</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FaTable /> Dashboard
        </NavLink>
        <NavLink to="/log" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FaUserMd /> Log Interaction
        </NavLink>
        <NavLink to="/chat" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FaComments /> AI Chat
        </NavLink>
        <NavLink to="/reports" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FaChartBar /> Reports
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
