import React, { useContext } from 'react';
import Navbar from '../Navbar';
import { AuthContext } from '../../context/auth';

const AuthLayout = ({ children }) => {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    // Render loading state or skeleton component
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
