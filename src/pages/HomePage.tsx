import React from 'react';
import { Avatar, Box, Button, Chip, Container, Stack, Typography, useTheme } from '@mui/material';
import { ArrowOutward, AutoAwesome, GitHub } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';

const MotionBox = motion(Box);

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({ initial: reduceMotion ? false : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.72, delay } });

  return <Box sx={{ overflow: 'hidden', bgcolor: 'background.default' }}>
    <Box component="section" sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', pt: { xs: 11, md: 8 }, pb: { xs: 7, md: 5 }, overflow: 'hidden', bgcolor: 'background.default',
      '@keyframes homeGridDrift': { '0%': { backgroundPosition: '0 0, 0 0' }, '100%': { backgroundPosition: '104px 52px, 52px 104px' } },
      '@keyframes homeBlobOne': { '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' }, '50%': { transform: 'translate3d(9vw,8vh,0) scale(1.14)' } },
      '@keyframes homeBlobTwo': { '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' }, '50%': { transform: 'translate3d(-10vw,-6vh,0) scale(.88)' } },
      '@keyframes homeOrbit': { '50%': { transform: 'translate(-12px,25px) rotate(12deg)' } },
    }}>
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.48, backgroundImage: `linear-gradient(${theme.palette.primary.main}0D 1px, transparent 1px), linear-gradient(90deg, ${theme.palette.primary.main}0D 1px, transparent 1px)`, backgroundSize: '52px 52px', maskImage: 'linear-gradient(to bottom, black, transparent 72%)', animation: reduceMotion ? 'none' : 'homeGridDrift 26s linear infinite' }} />
      <Box aria-hidden="true" sx={{ position: 'absolute', width: { xs: 290, md: 560 }, height: { xs: 290, md: 560 }, borderRadius: '50%', right: { xs: '-42%', md: '-12%' }, top: { xs: '6%', md: '-20%' }, pointerEvents: 'none', background: `radial-gradient(circle, ${theme.palette.primary.main}34 0%, ${theme.palette.primary.main}12 43%, transparent 70%)`, filter: 'blur(10px)', animation: reduceMotion ? 'none' : 'homeBlobOne 15s ease-in-out infinite' }} />
      <Box aria-hidden="true" sx={{ position: 'absolute', width: { xs: 260, md: 480 }, height: { xs: 260, md: 480 }, borderRadius: '50%', left: { xs: '-44%', md: '-10%' }, bottom: { xs: '-6%', md: '-25%' }, pointerEvents: 'none', background: `radial-gradient(circle, ${theme.palette.secondary.main}30 0%, ${theme.palette.secondary.main}10 45%, transparent 70%)`, filter: 'blur(14px)', animation: reduceMotion ? 'none' : 'homeBlobTwo 17s ease-in-out -5s infinite' }} />
      <Box aria-hidden="true" sx={{ position: 'absolute', width: { xs: 260, md: 510 }, aspectRatio: '1', right: { xs: '-45%', md: '-9%' }, top: { xs: '3%', md: '-10%' }, border: `1px solid ${theme.palette.primary.main}3D`, borderRadius: '50%', animation: reduceMotion ? 'none' : 'homeOrbit 12s ease-in-out infinite', '&::before, &::after': { content: '""', position: 'absolute', borderRadius: '50%', border: `1px solid ${theme.palette.primary.main}2B` }, '&::before': { inset: '10%' }, '&::after': { inset: '23%' } }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 790 }}>
          <MotionBox {...reveal(0)}><Chip icon={<AutoAwesome sx={{ fontSize: '16px !important' }} />} label="PERSONAL SPACE · 2026" sx={{ mb: { xs: 3, md: 4 }, px: 0.75, height: 34, borderRadius: '20px', bgcolor: `${theme.palette.primary.main}16`, color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.7rem', '& .MuiChip-icon': { color: 'primary.main' } }} /></MotionBox>
          <MotionBox {...reveal(0.12)}><Stack direction="row" spacing={2} alignItems="center" sx={{ mb: { xs: 3, md: 4 } }}><Box sx={{ position: 'relative' }}><Avatar src={personalInfo.avatar} alt={personalInfo.name} sx={{ width: { xs: 52, md: 64 }, height: { xs: 52, md: 64 }, border: `3px solid ${theme.palette.background.paper}`, boxShadow: `0 10px 26px ${theme.palette.primary.main}38` }} /><Box sx={{ position: 'absolute', right: 0, bottom: 1, width: 13, height: 13, borderRadius: '50%', bgcolor: '#59C783', border: `2px solid ${theme.palette.background.default}` }} /></Box><Box><Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '0.04em' }}>CURRENTLY EXPLORING</Typography><Typography fontWeight={700}>Linux · Automation · Infrastructure</Typography></Box></Stack></MotionBox>
          <MotionBox {...reveal(0.22)}><Typography component="h1" sx={{ fontSize: { xs: '3.35rem', sm: '4.6rem', md: '6.7rem' }, lineHeight: 0.93, fontWeight: 800, letterSpacing: '-0.075em' }}>BUILD<br /><Box component="span" sx={{ color: 'primary.main', position: 'relative', display: 'inline-block' }}>QUIETLY.<Box component="span" sx={{ position: 'absolute', width: { xs: 10, md: 14 }, height: { xs: 10, md: 14 }, right: { xs: -15, md: -20 }, top: 2, borderRadius: '50%', bgcolor: 'secondary.main' }} /></Box></Typography></MotionBox>
          <MotionBox {...reveal(0.34)}><Typography sx={{ mt: { xs: 3, md: 4 }, maxWidth: 525, fontSize: { xs: '1rem', md: '1.18rem' }, lineHeight: 1.8, color: 'text.secondary' }}>欢迎来到 {personalInfo.name} 的数字花园。记录折腾服务器、自动化工具和持续学习的每一步。</Typography></MotionBox>
          <MotionBox {...reveal(0.46)}><Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: { xs: 4, md: 5 } }}><Button component={Link} to="/about" variant="contained" endIcon={<ArrowOutward />} sx={{ px: 3.2, py: 1.35, width: { xs: '100%', sm: 'fit-content' }, boxShadow: `0 12px 28px ${theme.palette.primary.main}42`, '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 18px 34px ${theme.palette.primary.main}55` } }}>认识我</Button><Button component="a" href={personalInfo.github} target="_blank" rel="noreferrer" variant="outlined" startIcon={<GitHub />} sx={{ px: 3, py: 1.35, width: { xs: '100%', sm: 'fit-content' }, color: 'text.primary' }}>GitHub</Button></Stack></MotionBox>
        </Box>
      </Container>
    </Box>
  </Box>;
};
