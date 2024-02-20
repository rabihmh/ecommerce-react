import React from 'react';
import Navbar from '../Navbar';
import Login from '../../pages/Login';

const GuestLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Login />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default GuestLayout;
