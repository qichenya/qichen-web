import React, { useState } from 'react';
import { AppBar, Box, IconButton, Stack, Toolbar, Typography, alpha, useMediaQuery, useTheme } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps { toggleTheme: () => void; isDarkMode: boolean; }

const navItems = [{ label: '首页', path: '/' }, { label: '关于', path: '/about' }, { label: '友链', path: '/links' }];

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const closeMenu = () => setMobileOpen(false);

  const navLink = (item: typeof navItems[number]) => {
    const selected = location.pathname === item.path;
    return (
      <Box key={item.path} component={Link} to={item.path} sx={{ textDecoration: 'none', color: selected ? 'primary.onContainer' : 'text.primary', bgcolor: selected ? 'primary.container' : 'transparent', fontWeight: selected ? 700 : 500, borderRadius: 99, px: 1.75, py: 0.85, transition: 'background-color .2s ease, color .2s ease', '&:hover': { bgcolor: selected ? 'primary.container' : alpha(theme.palette.primary.main, 0.1) } }}>
        {item.label}
      </Box>
    );
  };

  const mobileNavLink = (item: typeof navItems[number], index: number) => {
    const selected = location.pathname === item.path;
    return (
      <motion.div
        key={item.path}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: index * 0.05, duration: 0.2 }}
      >
        <Box
          component={Link}
          to={item.path}
          onClick={closeMenu}
          sx={{
            display: 'block',
            textDecoration: 'none',
            color: selected ? 'primary.main' : 'text.primary',
            fontWeight: selected ? 600 : 500,
            fontSize: '1rem',
            py: 1.75,
            px: 1,
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.5),
            transition: 'color .15s ease, padding-left .15s ease',
            '&:hover': {
              color: 'primary.main',
              paddingLeft: 2,
            },
            '&:last-child': {
              borderBottom: 'none',
            },
          }}
        >
          {item.label}
        </Box>
      </motion.div>
    );
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: alpha(theme.palette.background.paper, 0.82),
          backgroundImage: 'none',
          backdropFilter: 'blur(18px)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, minHeight: { xs: 64, md: 80 }, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'text.primary',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 800,
              letterSpacing: '-0.045em',
            }}
          >
            QICHEN<Box component="span" sx={{ color: 'primary.main' }}>.</Box>
          </Typography>
          {mobile ? (
            <Stack direction="row" spacing={0.5}>
              <IconButton onClick={toggleTheme} aria-label="切换主题">
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              <IconButton
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? '关闭导航' : '打开导航'}
                sx={{
                  transition: 'transform .2s ease',
                  transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box sx={{ display: 'flex', gap: 0.5, p: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.08), borderRadius: 99 }}>
                {navItems.map((item) => navLink(item))}
              </Box>
              <IconButton onClick={toggleTheme} aria-label="切换主题">
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <AnimatePresence>
        {mobile && mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              zIndex: theme.zIndex.drawer,
              overflow: 'hidden',
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(18px)',
              borderBottom: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.5),
            }}
          >
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 1 }}>
              {navItems.map((item, index) => mobileNavLink(item, index))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
