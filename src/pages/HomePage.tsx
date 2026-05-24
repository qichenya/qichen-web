import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  keyframes,
} from '@mui/material';
import { Terminal, Computer } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/personalInfo';
import { SearchDialog } from '../components/SearchDialog';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    filter: blur(10px);
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
<<<<<<< HEAD

  const pressTimer =
    useRef<ReturnType<typeof setTimeout> | null>(null);
=======
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
>>>>>>> 39ff1c4 (feat: add initial project structure with HTML, SVG avatar, and Vite configuration)

  const handleMouseDown = () => {
    pressTimer.current = setTimeout(() => {
      setDialogOpen(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleSelectEngine = (engine: string) => {
    setDialogOpen(false);
    navigate(`/search?engine=${engine}`);
  };

  const handleTouchStart = () => {
    pressTimer.current = setTimeout(() => {
      setDialogOpen(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'background.default',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              animation: `${fadeIn} 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              opacity: 0,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.5,
                py: 0.75,
                borderRadius: 4,
                backgroundColor: 'primary.container',
                color: 'primary.onContainer',
                mb: 4,
                fontSize: '0.875rem',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.primary.main}20`,
              }}
            >
              <Computer sx={{ fontSize: 18 }} />

              <Typography
                variant="body2"
                fontWeight={500}
              >
                一只笨猫用AI构建的个人网站
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              animation: `${slideUp} 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards`,
              opacity: 0,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 5,
                fontWeight: 700,
                fontSize: {
                  xs: '2.25rem',
                  md: '3rem',
                },
                lineHeight: 1.2,
                color: 'text.primary',
              }}
            >
              Hi！我是{' '}

              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  position: 'relative',
                  display: 'inline-block',

                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 2,
                    left: 0,
                    right: 0,
                    height: 6,
                    backgroundColor: 'primary.main',
                    opacity: 0.25,
                    borderRadius: 3,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    animation:
                      'underlineReveal 0.8s ease-out 1.2s forwards',

                    '@keyframes underlineReveal': {
                      to: {
                        transform: 'scaleX(1)',
                      },
                    },
                  },
                }}
              >
                {personalInfo.name}
              </Box>
            </Typography>
          </Box>

          <Box
            sx={{
              animation: `${slideUp} 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards`,
              opacity: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                component={Link}
                to="/about"
                variant="contained"
                size="large"
                startIcon={<Terminal />}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 4,
                }}
              >
                ABOUT ME
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <SearchDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelectEngine={handleSelectEngine}
      />
    </Box>
  );
};
