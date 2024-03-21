import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UseAuthContext } from '../hooks/UseAuthContext';

function requireAuth<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  return function WrappedComponent(props: P) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const { dispatch } = UseAuthContext();

    useEffect(() => {
      const checkIsAuthenticated = async () => {
        try {
          const response = await fetch(`/api/auth/is-authenticated`);
          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            dispatch({ type: 'LOGOUT' }); 
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsLoggedIn(false);
          dispatch({ type: 'LOGOUT' }); 
        }
      };

      checkIsAuthenticated();
    }, [dispatch]);

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

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UseAuthContext } from '../hooks/UseAuthContext';

// function requireAuth<P extends object>(Component: React.ComponentType<P>): React.FC<P> {

  

//   return function WrappedComponent(props: P) {

//     if (isLoggedIn) {
//       return <Component {...props} />;
//     }

//     return <Navigate to="/login" />;
//   };
// }

// export default requireAuth;
