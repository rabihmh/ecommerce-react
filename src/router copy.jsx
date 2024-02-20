// router.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GuestLayout from './components/layouts/GuestLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

/* import VerifyEmail from './views/VerifyEmail';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import Categories from './views/admin/category';
import Profile from './views/admin/profile';
import Products from './views/admin/product';
import CreateProduct from './views/admin/product/create';
import UpdateProduct from './views/admin/product/update';
import Tags from './views/admin/tag';
import Cart from './views/cart'; */

const RouterComponent1 = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/"
          element={<GuestLayout />}
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
         {/*  <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="password-reset" element={<ResetPassword />} /> */}
        </Route>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route path="dashboard" element={<Dashboard />} />
         {/*  <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="tags" element={<Tags />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/edit/:id" element={<UpdateProduct />} />
          <Route path="profile" element={<Profile />} />
          <Route path="verify" element={<VerifyEmail />} /> */}
        </Route>
        <Route
          path="/user"
          element={<AuthLayout />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="profile" element={<Profile />} />
          <Route path="verify" element={<VerifyEmail />} />
          <Route path="cart" element={<Cart />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterComponent1;
