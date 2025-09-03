import useAuthContext from '../../hooks/useAuthContext';

function Authenticated({ children, fallback = (<></>) }) {
  const [isAuthenticated] = useAuthContext((s) => [s.isAuthenticated]);

  if (!isAuthenticated) {
    return fallback;
  }

  return children;
}

export default Authenticated;