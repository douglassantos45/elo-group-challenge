import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getLocalStorage, saveLocalStorage } from '../utils/local-storage';

type ThemeContextProps = {
  theme?: string;
  toggleTheme(): void;
};
type ThemeContextProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextProps>(null!);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState(getLocalStorage('@theme') ?? 'dark');

  const toggleTheme = () => {
    const selectedTheme = theme == 'light' ? 'dark' : 'light';
    setTheme(selectedTheme);
  };

  useEffect(() => {
    const root = window.document.body;
    const removeOldTheme = theme == 'light' ? 'dark' : 'light';
    root.classList.remove(removeOldTheme);
    root.classList.add(theme);
    saveLocalStorage('@theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
