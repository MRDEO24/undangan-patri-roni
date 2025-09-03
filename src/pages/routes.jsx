import { createBrowserRouter } from 'react-router-dom';
import templatesRoutes from './templates/routes';
import PageDashboard from './dashboard';
import authenticationRoutes from './authentication/routes';
import weddingRoutes from './wedding/routes';
import NotFoundPage from './notFound';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageDashboard />,
  },
  {
    path: '/templates',
    children: templatesRoutes,
  },
  {
    path: '/wedding',
    children: weddingRoutes,
  },
  {
    path: '/authentication',
    children: authenticationRoutes,
  },
  {
    path: '/notfound',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default routes;