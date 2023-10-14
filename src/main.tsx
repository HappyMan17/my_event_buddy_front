import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { AppRouter } from './router/'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
