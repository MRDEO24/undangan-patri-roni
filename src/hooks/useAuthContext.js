import { useContext } from 'react';
import { useStore } from 'zustand';
import { AuthContext } from '../stores/authContext';

const useAuthContext = (selector) => {
  const context = useContext(AuthContext);
  return useStore(context, selector);
};

export default useAuthContext;