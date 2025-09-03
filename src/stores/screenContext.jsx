import { useRef, useEffect, createContext } from 'react';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { useBreakpointValue } from '@chakra-ui/react';
import createStorePersist from '../utils/createStorePersist';

export const ScreenContext = createContext({});

export function ScreenContextProvider({ children }) {
  const isDidMount = useRef(true);
  const isMobile = useBreakpointValue({ base: true, sm: false }, { ssr: true }) ?? true;
  const store = useRef(createStore(persist(
    () => ({
      isMobile,
    }),
    createStorePersist('key'),
  )));

  useEffect(() => {
    if (!isDidMount.current) {
      store.current.setState(() => ({
        isMobile,
      }));
    }

    isDidMount.current = false;
  }, [isMobile]);

  return (
    <ScreenContext.Provider value={store.current}>
      {children}
    </ScreenContext.Provider>
  );
}