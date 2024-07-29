import useInfo from '../controller/hook/useInfo';

import RootPage from './page/Root.page';
import './page/reset.css'
import './page/colorpicker.css'

const  App = () => {
  useInfo('App');

  return (
    <RootPage />
  );
};

export default App;