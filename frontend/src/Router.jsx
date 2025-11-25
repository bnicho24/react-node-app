import React from 'react'
import { useRoutes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './pages/Dashboard';
import RoleRedirect from './routes/roleredirect';
import MainWrapper from './layout/MainWrapper';
import Profile from './layout/Profile';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';

const Router = () => {
    let routes = useRoutes([
    {path: "/", element: <RoleRedirect />},
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: <MainWrapper />,   // contains Header, Sidebar, PageContainer
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetails /> }
        // add more pages here
        // { path: "profile", element: <Profile /> },
        // { path: "settings", element: <Settings /> },
      ],
    },
  ]);

  return routes;
 
}

export default Router