import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  WbSunny,
  Nightlight,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const navItems = [
  { label: '首页', path: '/' },
  { label: '关于', path: '/about' },
];

export const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  isDarkMode,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={handleDrawerToggle}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.container',
                  color: 'primary.onContainer',
                  '&:hover': {
                    backgroundColor: 'primary.container',
                  },
                },
                '&:hover': {
                  backgroundColor: alpha(
                    theme.palette.primary.main,
                    0.08
                  ),
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'surface.main',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={{
                  mr: 1,
                  color: 'text.primary',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(
                      theme.palette.primary.main,
                      0.08
                    ),
                  },
                }}
              >
                {isDarkMode ? <WbSunny /> : <Nightlight />}
              </IconButton>

              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.primary',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(
                      theme.palette.primary.main,
                      0.08
                    ),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    textDecoration: 'none',
                    px: 2,
                    py: 1,
                    borderRadius: 4,
                    backgroundColor:
                      location.pathname === item.path
                        ? 'primary.container'
                        : 'transparent',
                    color:
                      location.pathname === item.path
                        ? 'primary.onContainer'
                        : 'text.primary',
                    fontWeight:
                      location.pathname === item.path
                        ? 600
                        : 400,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor:
                        location.pathname === item.path
                          ? 'primary.container'
                          : alpha(
                              theme.palette.primary.main,
                              0.08
                            ),
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}

              <IconButton
                onClick={toggleTheme}
                sx={{
                  ml: 1,
                  color: 'text.primary',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: alpha(
                      theme.palette.primary.main,
                      0.08
                    ),
                  },
                }}
              >
                {isDarkMode ? <WbSunny /> : <Nightlight />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            backgroundColor: 'surface.main',
            borderRight: '1px solid',
            borderColor: 'outline',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
