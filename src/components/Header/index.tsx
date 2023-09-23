import { FaSignOutAlt } from 'react-icons/fa';
import LogoHeader from '../../assets/logo-header.png';
import { getLocalStorage } from '../../utils/local-storage';
import './styles.scss';

export const Header = () => {
  const username = getLocalStorage('@elo-group:registration');

  const signOut = () => {
    localStorage.removeItem('@elo-group:token');
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <img src={LogoHeader} />
      <span>
        <small>Bem-vindo(a),</small> <b>{username?.username}</b>
        <FaSignOutAlt onClick={signOut} />
      </span>
    </header>
  );
};
