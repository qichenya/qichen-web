<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 39ff1c4 (feat: add initial project structure with HTML, SVG avatar, and Vite configuration)
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
