import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { AppRouter } from './router/'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
)
