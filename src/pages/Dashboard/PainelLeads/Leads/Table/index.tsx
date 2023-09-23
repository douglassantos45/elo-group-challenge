import { userLeadsContext } from '../../../../../contexts/userLeads';
import { useTheme } from '../../../../../hooks/useTheme';
import { Header } from './Header';
import { Rows } from './Rows';

import './styles.scss';

export function Table() {
  const { theme } = useTheme();
  const { userLeads } = userLeadsContext();
  return (
    <table className={`leads-table ${theme}`} cellPadding="5px" cellSpacing="0">
      <Header />
      <tbody>
        {!!userLeads.length &&
          userLeads.map((user, index) => (
            <Rows key={index} username={user.username} />
          ))}
      </tbody>
    </table>
  );
}
