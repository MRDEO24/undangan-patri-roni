import PageRusticWeddingBloom from '../pages/templates/rusticWeddingBloom';
import PageRusticWeddingBloomEdit from '../pages/templates/rusticWeddingBloom/edit';
import PageRusticWeddingBloomEditPreview from '../pages/templates/rusticWeddingBloom/editPreview';
import { MODE } from '../utils/env';

export const Templates = [
  {
    id: 'rustic_wedding_bloom',
    path: 'rustic-wedding-bloom',
    uuid: MODE === 'production' ? '879349eb-178f-4628-b21d-f946c40aeeac' : '879349eb-178f-4628-b21d-f946c40aeeac',
    componentPreview: <PageRusticWeddingBloom />,
    componentCreate: <PageRusticWeddingBloomEdit />,
    componentCreatePreview: <PageRusticWeddingBloomEditPreview />,
    componentEdit: <PageRusticWeddingBloomEdit />,
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const generateRoutes = () => Templates.map((template) => [
  {
    path: template.path,
    element: template.componentPreview,
  },
  {
    path: `${template.path}/create`,
    element: template.componentCreate,
  },
  {
    path: `${template.path}/create-preview`,
    element: template.componentCreatePreview,
  },
  {
    path: `${template.path}/edit/:uuid`,
    element: template.componentEdit,
  },
]).flatMap((route) => route);
