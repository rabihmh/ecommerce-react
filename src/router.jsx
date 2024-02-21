import React from 'react';
import { createBrowserRouter,} from "react-router-dom";
import GuestLayout from './components/layouts/GuestLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from './pages/Admin/Products';
import ProductEdit from './pages/Admin/ProductEdit';
import AddProduct from './pages/Admin/AddProduct';
import CategoryList from './pages/Admin/CategoryList';
import Dashboard from './pages/Admin/Dashboard'
import ProductCollection from './pages/ProductCollection';
import AddCategory from './pages/Admin/AddCategory';
import UpdateCategory from './pages/Admin/UpdateCategory';
import ProductOverview from './pages/ProductOverview';
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
      },
      {
        path:'/products',
        element: <ProductCollection />
      },
      {
        path:'/products/show/:id',
        element: <ProductOverview />
      }

    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />, 
    children: [
      {
        path:'/admin/dashboard',
        element: <Dashboard />
      },
      {
        path:'/admin/products',
        element: <Products />
      },
      {
        path: '/admin/products/:id',
        element: <ProductEdit /> 
      },
      {
        path:'/admin/categories/add',
        element: <AddCategory />
      },
      {
        path:'/admin/categories',
        element: <CategoryList />
      },
      {
        path:'/admin/categories/:id',
        element: <UpdateCategory />
      },
      {
        path:'/admin/products/add',
        element: <AddProduct />
      }

    ]
  }
]);

export default RouterComponent;
