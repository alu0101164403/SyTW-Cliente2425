import React from 'react';
import '../styles/header.css';

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;
