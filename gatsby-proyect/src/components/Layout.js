import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MenuNotices from './MenuNotices';
import '../styles/layout.css'; 

const Layout = ({ children, title }) => {
  return (
    <div className="layout">
      <Header title={title} />
      <MenuNotices />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
