import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Conversation from '../components/ConversationView/Conversation';
import MenuIcon from '../components/sidebar/MenuIcon';
import './MobileView.css';

const MobileView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    setColor(isSidebarOpen ? '#E4DDBB' : '#000000');
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mobile-view">
      {isSidebarOpen && <Sidebar />}
      <div className="content-container">
        <MenuIcon style={{ color: color }} toggleSidebar={toggleSidebar} />
        <Conversation />
      </div>
    </div>
  );
};

export default MobileView;
