import { RouterProvider } from 'react-router-dom';
import Providers from './components/providers';
import routes from './pages/routes';
// import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
       
      <Providers>
        <RouterProvider router={routes} />
      </Providers>
  );
}

export default App;
