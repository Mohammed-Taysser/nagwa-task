import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Practice = lazy(() => import('../pages/Practice'));
const Rank = lazy(() => import('../pages/Rank'));
const NotFound = lazy(() => import('../pages/404'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Practice />,
  },
  {
    path: '/rank',
    element: <Rank />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
