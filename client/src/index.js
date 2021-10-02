import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store';

import FilmTab from './FilmTab';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FilmTab />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
