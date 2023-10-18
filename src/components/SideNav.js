// SideNav.js
import React from 'react';

const SideNav = ({ isOpen, onClose }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <a href="javascript:void(0)" className="closebtn" onClick={onClose}>&times;</a>
      {/* Add your navigation links and content here */}
    </div>
  );
};

export default SideNav;
