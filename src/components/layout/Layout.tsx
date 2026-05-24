import { Box } from '@mui/material';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  toggleTheme,
  isDarkMode,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />

      <Box
        component="main"
        sx={{
          pt: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
