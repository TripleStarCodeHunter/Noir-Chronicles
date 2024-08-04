import React from 'react';
import './MenuIcon.css';

const MenuIcon = ({ style, toggleSidebar }) => {
  return (
    <div className="menu-icon" onClick={toggleSidebar} style={style}>
      &#9776; {/* Hamburger menu icon */}
    </div>
  );
};

export default MenuIcon;
