import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { MODE } from '../../utils/env';
import { theme } from '../../customTheme';
import ErrorBoundary from '../errorBoundary';
import { AuthContextProvider } from '../../stores/authContext';

const Providers = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            {children}
            {MODE !== 'production' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </AuthContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
};

export default Providers;