import React, { useEffect } from 'react';
import { auth } from './firebase.init';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {

    try {
      const user: any = auth.currentUser;
      const localEmail: string | null = localStorage.getItem('email');
      if (!user || !localEmail) {
        window.location.href = '/login';
      } else {
        localStorage.removeItem('email');
      }
    } catch (error) { }
  }, []);

  return <>{children}</>;
};

export const RouterToLogin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    window.location.href = '/login';
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
