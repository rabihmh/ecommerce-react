import React, { useContext } from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const { isLoading, isAdmin } =  useStateContext();

  if (isLoading) {
    return null;
  }

  if (!isAdmin) {
    return <p>Unauthorized Access</p>;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
