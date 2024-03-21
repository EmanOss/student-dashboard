import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const UseAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};