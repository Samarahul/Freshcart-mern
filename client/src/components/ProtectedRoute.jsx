// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/login" replace />; // Or "/" for homepage
  }

  return <Outlet />;
};

export default ProtectedRoute;
