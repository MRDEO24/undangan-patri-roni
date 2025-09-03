import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PageDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: remove when dashboard page is already
    navigate('/templates');
  }, [navigate]);

  return (
    <div>Dashboard</div>
  );
}

export default PageDashboard;
