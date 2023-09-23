import { userLeadsContext } from '../../../../contexts/userLeads';
import { Table } from './Table';
import './styles.scss';

export const Leads = () => {
  const { userLeads } = userLeadsContext();
  return (
    <div className="leads">
      <Table />
      {!userLeads.length && <p>Nenhuma lead cadastrada</p>}
    </div>
  );
};
