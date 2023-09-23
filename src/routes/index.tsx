import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserLeadsProvider } from '../contexts/userLeads';
import { ModalProvider } from '../hooks/useModal';
import { useTheme } from '../hooks/useTheme';
import { Router } from './Router';

export const Routes = () => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <Toaster
        toastOptions={{
          style: {
            fontSize: '0.8rem',
            background: theme === 'dark' ? '#101113' : '',
            color: theme === 'dark' ? 'white' : '',
          },
        }}
      />
      <UserLeadsProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </UserLeadsProvider>
    </BrowserRouter>
  );
};
