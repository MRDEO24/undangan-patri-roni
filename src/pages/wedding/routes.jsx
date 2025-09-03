import PageRusticWeddingBloom from '../templates/rusticWeddingBloom/index';
import PageRusticWeddingBloomEdit from '../templates/rusticWeddingBloom/edit';

const weddingRoutes = [
  {
    path: 'rustic-wedding-bloom',
    element: <PageRusticWeddingBloom />,
  },
  {
    path: ':wedding_url',
    element: <PageRusticWeddingBloom />,
  },
  {
    path: 'rustic-wedding-bloom/edit',
    element: <PageRusticWeddingBloomEdit />,
  },
];

export default weddingRoutes;
