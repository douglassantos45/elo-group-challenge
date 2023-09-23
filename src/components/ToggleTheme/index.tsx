import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useTheme } from '../../hooks/useTheme';
import './style.scss';
export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      tabIndex={0}
      className={`toggle-theme ${theme}`}
      onClick={toggleTheme}
      aria-label="Alterar o tema do site"
    >
      {theme === 'dark' ? <BsSunFill /> : <BsMoonFill />}
    </button>
  );
};
