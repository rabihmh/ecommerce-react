import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import { Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const { isAuthenticated } = useStateContext();
  
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
      <div className="container mx-auto">
      </div>
      <Navigate to={isAuthenticated ? "/home" : "/login"} />
    </div>
  );
};

export default AuthLayout;
