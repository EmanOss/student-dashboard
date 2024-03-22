import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function requireAuth<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  return function WrappedComponent(props: P) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
      const checkIsAuthenticated = async () => {
        try {
          const response = await fetch(`/api/auth/is-authenticated`);
          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsLoggedIn(false);
        }
      };

      checkIsAuthenticated();
    }, []);

    if (isLoggedIn === null) {
      return <div>Loading...</div>;
    }

    if (isLoggedIn) {
      return <Component {...props} />;
    }

    return <Navigate to="/login" />;
  };
}

export default requireAuth;