import React, { useContext } from 'react';
import Navbar from '../Navbar';
import { AuthContext } from '../../context/auth';

const AdminLayout = ({ children }) => {
  const { isLoading, user, isAdmin } = useContext(AuthContext);

  if (isLoading) {
    // Render loading state or skeleton component
    return null;
  }

  if (!isAdmin) {
    // Handle unauthorized access here, redirect or show error message
    return <p>Unauthorized Access</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
