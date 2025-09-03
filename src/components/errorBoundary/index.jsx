import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { MODE } from '../../utils/env';

const ErrorBoundary = ({ children }) => {
  const toast = useToast({
    duration: 4500,
    isClosable: true,
    status: 'error',
  });
  const handleError = (error) => {
    if (MODE !== 'production' && error.filename.includes(`${window.origin}/node_modules/.vite/deps/`)) {
      return;
    }

    console.error(error);
    toast({
      title: error.error.name || 'Error',
      description: error.error.message || 'Something went wrong',
    });
  };

  useEffect(() => {
    addEventListener('error', handleError);

    return () => {
      removeEventListener('error', handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default ErrorBoundary;