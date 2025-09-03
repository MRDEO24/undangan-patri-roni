import { generateRoutes } from '../../constants/templates';
import PageDashboard from './dashboard';
import PageMe from './me';

const templatesRoutes = [
  {
    path: '',
    element: <PageDashboard />,
    name: 'templates_index',
  },
  {
    path: 'me',
    element: <PageMe />,
    name: 'templates_me',
  },
  ...generateRoutes(),
];

export default templatesRoutes;
