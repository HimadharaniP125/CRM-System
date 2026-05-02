import { NavLink } from 'react-router-dom';
import { FaUserMd, FaComments, FaTable, FaChartBar } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <FaUserMd />
        <span>CareCRM</span>
      </div>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
          onClick={onClose}
        >
          <FaTable /> Dashboard
        </NavLink>
        <NavLink 
          to="/log" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
          onClick={onClose}
        >
          <FaUserMd /> Log Interaction
        </NavLink>
        <NavLink 
          to="/chat" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
          onClick={onClose}
        >
          <FaComments /> AI Chat
        </NavLink>
        <NavLink 
          to="/reports" 
          className={({isActive}) => isActive ? "nav-item active" : "nav-item"}
          onClick={onClose}
        >
          <FaChartBar /> Reports
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
