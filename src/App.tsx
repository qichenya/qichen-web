import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createLightTheme, createDarkTheme, getRandomPalette } from './theme/theme';
import { Layout } from './components/layout/Layout';
import { AnimatedRoutes } from './components/AnimatedRoutes';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [selectedPalette] = useState(() => {
    const randomPalette = getRandomPalette();
    localStorage.setItem('palette', JSON.stringify(randomPalette));
    return randomPalette;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(() => {
    return isDarkMode ? createDarkTheme(selectedPalette) : createLightTheme(selectedPalette);
  }, [isDarkMode, selectedPalette]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          transition: 'background-color 0.5s ease, color 0.5s ease',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <BrowserRouter>
          <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
