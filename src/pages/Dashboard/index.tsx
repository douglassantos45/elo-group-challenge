import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils/local-storage';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { PainelLeads } from './PainelLeads';
import './styles.scss';
export const Dashboard = () => {
  const token = getLocalStorage('@elo-group:token');
  if (!token) return <Navigate to="login" replace />;
  return (
    <>
      <Header />
      <main className="dashboard">
        <PainelLeads />
        <Modal />
      </main>
    </>
  );
};
