import EloGroupImg from '../../../assets/logo-elogroup.png';
import { useTheme } from '../../../hooks/useTheme';
import { useModal } from '../../../hooks/useModal';
import { Leads } from './Leads';

import './styles.scss';

export const PainelLeads = () => {
  const { theme } = useTheme();
  const { open } = useModal();
  return (
    <div className={`painel-leads ${theme}`}>
      <header>
        <img src={EloGroupImg} />
        <h1>Painel de Leads</h1>
      </header>
      <main>
        <button onClick={open}>Novo Lead (+)</button>
        <Leads />
      </main>
    </div>
  );
};
