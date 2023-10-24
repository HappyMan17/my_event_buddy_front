import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { AppRouter } from './router/'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context';
import { Provider } from 'react-redux';
import { store } from './redux/';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
