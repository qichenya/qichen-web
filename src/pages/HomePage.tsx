import React from 'react';
import { Avatar, Box, Button, Chip, Container, Stack, Typography, useTheme } from '@mui/material';
import { ArrowOutward, AutoAwesome, GitHub } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';

const MotionBox = motion(Box);

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const reveal = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.72, delay } });

  return <Box sx={{ overflow: 'hidden', bgcolor: 'background.default' }}>
    <Box component="section" sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', pt: { xs: 11, md: 8 }, pb: { xs: 7, md: 5 }, bgcolor: 'background.default',
    }}>
      <Container maxWidth="lg">
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
