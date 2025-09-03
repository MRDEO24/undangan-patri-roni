import PageLogin from './login';
import Logout from './logout';
import PageRegister from './register';

const authenticationRoutes = [
  {
    path: 'login',
    element: <PageLogin />,
  },
  {
    path: 'register',
    element: <PageRegister />,
  },
  {
    path: 'logout',
    element: <Logout />,
  },
];

export default authenticationRoutes;
