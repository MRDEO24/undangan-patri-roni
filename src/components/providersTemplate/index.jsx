import { useRef } from 'react';
import Fonts from '../../customFonts';
import { theme } from '../../customTheme';
import { ScreenContextProvider } from '../../stores/screenContext';
import { ChakraProvider } from '@chakra-ui/react';
import Wrapper from '../wrapper';

function ProvidersTemplate({ children }) {
  const portalToastRef = useRef();

  return (
    <ChakraProvider theme={theme} toastOptions={{
      portalProps: {
        containerRef: portalToastRef,
      },
      defaultOptions: {
        containerStyle: {
          marginTop: '-30px',
          marginBottom: '45px',
        },
      },
    }}>
      <ScreenContextProvider>
        <Fonts />
        <Wrapper ref={portalToastRef}>
          {children}
        </Wrapper>
      </ScreenContextProvider>
    </ ChakraProvider >
  );
}

export default ProvidersTemplate;