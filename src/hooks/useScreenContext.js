import { useContext } from 'react';
import { useStore } from 'zustand';
import { ScreenContext } from '../stores/screenContext';

const useScreenContext = (selector) => {
  const context = useContext(ScreenContext);
  return useStore(context, selector);
};

export default useScreenContext;