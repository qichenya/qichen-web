import React, { useEffect, useRef } from 'react';
import { Avatar, Box, Button, Stack, Typography, alpha, useTheme } from '@mui/material';
import { ArrowOutward, GitHub } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/personalInfo';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';
import gsap from 'gsap';

const readout: { label: string; value: string }[] = [
  { label: 'STATUS', value: '摆烂中' },
  { label: 'FOCUS', value: 'Linux WAF Worker' },
  { label: 'LOCATION', value: personalInfo.location },
  { label: 'CONTACT', value: personalInfo.email },
];

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-hero="chip"]', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo('[data-hero="status"]', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.12, ease: 'power2.out' });
      gsap.fromTo('[data-hero="title"] .char', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.25, stagger: 0.035, ease: 'power3.out' });
      gsap.fromTo('[data-hero="subtitle"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.75, ease: 'power2.out' });
      gsap.fromTo('[data-hero="cta"] > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.9, stagger: 0.1, ease: 'power2.out' });
      gsap.fromTo('[data-hero="readout"]', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.1 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split('').map((ch, i) => (
      <Box component="span" key={i} className="char" sx={{ display: 'inline-block' }}>{ch === ' ' ? '\u00A0' : ch}</Box>
    ));

  return (
    <Box sx={{ overflow: 'hidden', position: 'relative', bgcolor: 'background.default' }}>
      <Box
        component="section"
        ref={heroRef}
        sx={{ pt: { xs: '112px', md: '152px' }, pb: { xs: 6, md: 7 } }}
      >
        <Box sx={{ maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 3 }}>
          <Box
            data-hero="chip"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.4,
              py: 0.75,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '2px',
              bgcolor: 'background.paper',
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: '0.09em',
              color: 'primary.main',
            }}
          >
            <Box component="span" sx={{ width: 6, height: 6, bgcolor: 'primary.main' }} />
            PERSONAL SPACE · 2026
          </Box>

          <Stack data-hero="status" direction="row" spacing={2} alignItems="center" sx={{ mt: 3 }}>
            <Box sx={{ position: 'relative', width: 52, height: 52, flex: 'none' }}>
              <Avatar
                src={personalInfo.avatar}
                alt={personalInfo.name}
                sx={{ width: 46, height: 46, m: '3px', borderRadius: '50%' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 3,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: FONT_MONO, fontSize: 11.5, letterSpacing: '0.1em', color: 'text.secondary' }}>
                CURRENTLY EXPLORING
              </Typography>
              <Typography sx={{ fontFamily: FONT_MONO, fontSize: 15, letterSpacing: '0.02em', mt: 0.25 }}>
                Linux · WAF · Worker
              </Typography>
            </Box>
          </Stack>

          <Typography
            data-hero="title"
            component="h1"
            sx={{
              mt: 3,
              fontFamily: FONT_DOTS,
              fontWeight: 900,
              fontSize: { xs: '4rem', sm: '5.6rem', md: '6.5rem' },
              lineHeight: 0.9,
              letterSpacing: '1px',
            }}
          >
            {splitChars('BUILD')}<br />
            <Box component="span" sx={{ display: 'inline-block' }}>
              {splitChars('QUIETLY.')}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: { xs: 10, md: 14 },
                  height: { xs: 10, md: 14 },
                  ml: 1.5,
                  bgcolor: 'primary.main',
                  verticalAlign: '0.06em',
                }}
              />
            </Box>
          </Typography>

          <Typography
            data-hero="subtitle"
            sx={{ mt: 3, maxWidth: 525, fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.8, color: 'text.secondary' }}
          >
            欢迎来到 {personalInfo.name} 的数字花园。记录折腾服务器、自动化工具和持续学习的每一步。
          </Typography>

          <Stack data-hero="cta" direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
            <Button
              component={Link}
              to="/about"
              variant="contained"
              endIcon={<ArrowOutward />}
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              认识我
            </Button>
            <Button
              component="a"
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              startIcon={<GitHub />}
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              GitHub
            </Button>
          </Stack>

          <Box data-hero="readout" sx={{ mt: { xs: 6, md: 7 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1.8px', color: 'text.secondary' }}>
                SYSTEM READOUT
              </Typography>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                <Box component="span" sx={{ width: 5, height: 5, bgcolor: 'primary.main' }} />
                <Typography sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1.4px', color: 'primary.main' }}>
                  LIVE
                </Typography>
              </Box>
            </Box>
            {readout.map((row) => (
              <Box
                key={row.label}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  py: 1.6,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', color: 'text.secondary' }}>
                  {row.label}
                </Box>
                <Box sx={{ fontFamily: FONT_MONO, fontSize: 12.5, letterSpacing: '0.03em', textAlign: 'right', wordBreak: 'break-all' }}>
                  {row.value}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        aria-hidden
        sx={{
          height: { xs: 140, md: 180 },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          fontFamily: FONT_DOTS,
          fontWeight: 900,
          fontSize: { xs: 120, md: 175 },
          lineHeight: 1,
          letterSpacing: '-2px',
          color: alpha(theme.palette.text.primary, 0.07),
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        QICHEN
      </Box>
    </Box>
  );
};
