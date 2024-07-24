import { createBrowserRouter } from 'react-router-dom';

import Hello from './organism/Hello';
import RootPage from './page/Root.page';
import ErrorPage from './page/Error.page';
import ParametrePage from './page/Parametre.page';
import IndexParametrePage from './organism/IndexParametrePage';
import IndexRootPage from './organism/IndexRootPage';

const schema = {
  root: {
    path: '/',
    name: 'Root',
  },
} as const;

type TRoutes =  typeof schema;
export const routes: TRoutes = schema;

const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <RootPage />,
    children: [
      { index: true, element: <IndexRootPage /> },
    ],
    errorElement: <ErrorPage/>
  },
  {
    path: '*',
    element: <ErrorPage />,
  }
]);

export default router;