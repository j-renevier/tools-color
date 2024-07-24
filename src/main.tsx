import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import './assets/sass/main.scss'
import App from './view/App.tsx';
import store from './model/redux/store.ts';
import ThemeProvider from './view/ThemeProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);





