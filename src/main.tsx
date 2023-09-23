import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeContextProvider } from './hooks/useTheme';
import { ToggleTheme } from './components/ToggleTheme';
import { Routes } from './routes';
import './styles/_main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ThemeContextProvider>
      <ToggleTheme />
      <Routes />
    </ThemeContextProvider>
  </>
);
