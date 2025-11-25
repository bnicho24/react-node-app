import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleRedirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }
 

  if (user.role === "Admin" || user.role === "User") {
    return <Navigate to="/dashboard" replace />;
  }

    return <Navigate to="/dashboard" replace />;
   
};
export default RoleRedirect