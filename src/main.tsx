import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

import '../src/styles/index.less';

import App from './components/App/App.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {' '}
      <App />
    </Provider>
  </StrictMode>,
);
