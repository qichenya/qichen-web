import React, { useState } from 'react';
import {
  AppBar, Box, IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import {
  ArrowOutward, Close as CloseIcon, DarkMode, LightMode, Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../../theme/theme';

interface HeaderProps { toggleTheme: () => void; isDarkMode: boolean; }
interface NavItem { label: string; path: string; }

const navItems: NavItem[] = [
  { label: '首页', path: '/' },
  { label: '博客', path: '/wiki-redirect' },
  { label: '关于', path: '/about' },
  { label: '友链', path: '/links' },
];

const indexLabel = (i: number) => String(i + 1).padStart(2, '0');

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navLink = (item: NavItem, index: number) => {
    const selected = location.pathname === item.path;
    return (
      <Box
        key={item.path}
        component={Link}
        to={item.path}
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 0.75,
          textDecoration: 'none',
          color: selected ? 'primary.main' : 'text.primary',
          transition: 'color .2s ease',
          '&:hover': { color: 'primary.main' },
          '&:hover .nav-index': { color: 'primary.main' },
        }}
      >
        <Box
          component="span"
          className="nav-index"
          sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1.2px', color: selected ? 'primary.main' : 'text.secondary', transition: 'color .2s ease' }}
        >
          {indexLabel(index)}
        </Box>
        <Box component="span" sx={{ fontSize: 13, letterSpacing: '0.04em', fontWeight: selected ? 700 : 400 }}>
          {item.label}
        </Box>
      </Box>
    );
  };

  const mobileNavLink = (item: NavItem, index: number) => {
    const selected = location.pathname === item.path;
    return (
      <Box
        key={item.path}
        component={Link}
        to={item.path}
        onClick={() => setMobileOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.75,
          py: 1.9,
          borderTop: index === 0 ? 'none' : '1px solid',
          borderColor: 'divider',
          color: selected ? 'primary.main' : 'text.primary',
          textDecoration: 'none',
          '&:hover': { color: 'primary.main' },
        }}
      >
        <Box component="span" sx={{ fontFamily: FONT_MONO, fontSize: 9.5, letterSpacing: '1.2px', color: selected ? 'primary.main' : 'text.secondary' }}>
          {indexLabel(index)}
        </Box>
        <Typography sx={{ flexGrow: 1, fontSize: 14, fontWeight: selected ? 700 : 400 }}>{item.label}</Typography>
        <ArrowOutward sx={{ fontSize: 16, color: 'text.secondary' }} />
      </Box>
    );
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: '100%',
            maxWidth: PAGE_MAX_WIDTH,
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            minHeight: { xs: '64px !important', md: '64px !important' },
          }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'text.primary',
              textDecoration: 'none',
              fontFamily: FONT_DOTS,
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '2px',
              lineHeight: 1,
            }}
          >
            QICHEN.
          </Typography>

          {mobile ? (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconButton onClick={toggleTheme} aria-label="切换主题">
                {isDarkMode ? <LightMode sx={{ fontSize: 19 }} /> : <DarkMode sx={{ fontSize: 19 }} />}
              </IconButton>
              <IconButton
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? '关闭导航' : '打开导航'}
              >
                {mobileOpen ? <CloseIcon sx={{ fontSize: 21 }} /> : <MenuIcon sx={{ fontSize: 21 }} />}
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2.75} alignItems="center">
              {navItems.map((item, index) => navLink(item, index))}
              <IconButton onClick={toggleTheme} aria-label="切换主题" sx={{ ml: 0.5 }}>
                {isDarkMode ? <LightMode sx={{ fontSize: 18 }} /> : <DarkMode sx={{ fontSize: 18 }} />}
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {mobile && mobileOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.drawer,
            bgcolor: 'background.default',
            borderBottom: '1px solid',
            borderColor: 'divider',
            animation: 'menuDrop .22s ease both',
            '@keyframes menuDrop': {
              from: { opacity: 0, transform: 'translateY(-8px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Box sx={{ maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 2, pb: 1 }}>
            {navItems.map((item, index) => mobileNavLink(item, index))}
          </Box>
        </Box>
      )}
    </>
  );
};
