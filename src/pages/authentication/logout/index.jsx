import { useEffect } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/loading';

function Logout() {
  const logout = useAuthContext((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return <Loading />;
}

export default Logout;