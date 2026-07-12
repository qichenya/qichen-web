import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, Stack, Toolbar, Typography, alpha, useMediaQuery, useTheme } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps { toggleTheme: () => void; isDarkMode: boolean; }

const navItems = [{ label: '首页', path: '/' }, { label: '关于', path: '/about' }, { label: '友链', path: '/links' }];

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const closeDrawer = () => setMobileOpen(false);

  const navLink = (item: typeof navItems[number], mobileItem = false) => {
    const selected = location.pathname === item.path;
    return (
      <Box key={item.path} component={Link} to={item.path} onClick={mobileItem ? closeDrawer : undefined} sx={{ textDecoration: 'none', color: selected ? 'primary.onContainer' : 'text.primary', bgcolor: selected ? 'primary.container' : 'transparent', fontWeight: selected ? 700 : 500, borderRadius: mobileItem ? 3 : 99, px: mobileItem ? 2 : 1.75, py: mobileItem ? 1.2 : 0.85, transition: 'background-color .2s ease, color .2s ease', '&:hover': { bgcolor: selected ? 'primary.container' : alpha(theme.palette.primary.main, 0.1) } }}>
        {item.label}
      </Box>
    );
  };

  return <>
    <AppBar position="fixed" elevation={0} sx={{ bgcolor: alpha(theme.palette.background.paper, 0.82), backgroundImage: 'none', backdropFilter: 'blur(18px)' }}>
      <Toolbar sx={{ maxWidth: 1200, minHeight: { xs: 72, md: 80 }, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Typography component={Link} to="/" sx={{ flexGrow: 1, color: 'text.primary', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.045em' }}>QICHEN<Box component="span" sx={{ color: 'primary.main' }}>.</Box></Typography>
        {mobile ? <Stack direction="row" spacing={0.5}><IconButton onClick={toggleTheme} aria-label="切换主题">{isDarkMode ? <LightMode /> : <DarkMode />}</IconButton><IconButton onClick={() => setMobileOpen(true)} aria-label="打开导航"><MenuIcon /></IconButton></Stack> : <Stack direction="row" spacing={1.25} alignItems="center"><Box sx={{ display: 'flex', gap: 0.5, p: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.08), borderRadius: 99 }}>{navItems.map((item) => navLink(item))}</Box><IconButton onClick={toggleTheme} aria-label="切换主题">{isDarkMode ? <LightMode /> : <DarkMode />}</IconButton></Stack>}
      </Toolbar>
    </AppBar>
    <Drawer anchor="right" open={mobileOpen} onClose={closeDrawer} PaperProps={{ sx: { width: 300, p: 2, bgcolor: 'background.paper' } }}>
      <Typography sx={{ px: 1, py: 1.5, fontWeight: 800, letterSpacing: '-0.04em' }}>QICHEN.</Typography>
      <List sx={{ display: 'grid', gap: 0.5, mt: 2 }}>{navItems.map((item) => <ListItemButton key={item.path} disableGutters sx={{ p: 0 }}>{navLink(item, true)}</ListItemButton>)}</List>
    </Drawer>
  </>;
};
