import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store';

import FilmTab from './FilmTab';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <FilmTab />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
