import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import { Navigate } from 'react-router-dom';
const GuestLayout = () => {
  const { isAdmin, isAuthenticated } = useStateContext();
  const isGuest = !isAuthenticated;

  return (
    <div>
      <Navbar isGuest={isGuest} />
      <Outlet />
      <div className="container mx-auto">
      </div>
      {isAuthenticated && <Navigate to={isAdmin ? "/admin/dashboard" : "/home"} />}
    </div>
  );
};

export default GuestLayout;
