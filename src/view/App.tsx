import { RouterProvider } from 'react-router-dom';

import router from './router';
import useInfo from '../controller/hook/useInfo';
import usePersist from '../controller/hook/usePersist';

const  App = () => {
  useInfo('App');
  usePersist(); //Persist store in local storage destruction of the store

  return (
    <RouterProvider router={router} />
  );
};

export default App;