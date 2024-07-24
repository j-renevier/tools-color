import useTheme from '../controller/hook/useTheme';

export const ThemeProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  useTheme();

  return children;
} 

export default ThemeProvider;