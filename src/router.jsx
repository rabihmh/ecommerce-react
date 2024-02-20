import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GuestLayout from './components/layouts/GuestLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthContext } from './context/auth';

const RouterComponent = () => {
  const { user, isAdmin } = useContext(AuthContext);
  //const { user, isAdmin } = null;


  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterComponent;
