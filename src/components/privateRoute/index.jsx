import { useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading';

function PrivateRoute({ children, loadingFallback = <Loading />, forAuthenticated = true, redirectPath = '/' }) {
  const navigate = useNavigate();
  const [isAuthenticated, isLoading] = useAuthContext((s) => [s.isAuthenticated, s.isLoading]);
  const isRedirect = forAuthenticated ? !isAuthenticated : isAuthenticated;

  useEffect(() => {
    if (isRedirect && !isLoading) {
      navigate(redirectPath);
    }
  }, [isLoading, isRedirect, navigate, redirectPath]);

  if (isLoading) {
    return loadingFallback;
  }

  return children;
}

export default PrivateRoute;