import React from 'react';
import { createBrowserRouter,} from "react-router-dom";
import GuestLayout from './components/layouts/GuestLayout';
import AuthLayout from './components/layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
const RouterComponent = createBrowserRouter([
  {
      path: '/',
      element: <GuestLayout />,
      children: [
          {
              path: 'login',
              element: <Login />
          },
          {
              path: 'register',
              element: <Register />
          },
      ]
  },
  {
    path: '/',
    element: <AuthLayout />, 
    children: [
      {
        path:'/home',
        element: <Home />
      }
    ]
  }
]);

export default RouterComponent;
