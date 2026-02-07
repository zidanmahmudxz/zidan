
import React from 'react';
import { Navigate } from 'react-router-dom';
import { db } from '../services/db';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = db.getUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
