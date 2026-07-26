import React, { useEffect, useRef } from 'react';
import { Avatar, Box, Button, Chip, Container, Stack, Typography, useTheme } from '@mui/material';
import { ArrowOutward, AutoAwesome, GitHub } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/personalInfo';
import { useMagnetic, useGsapParallax } from '../hooks/useGsapAnimations';
import gsap from 'gsap';

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const magneticRef = useMagnetic<HTMLAnchorElement>();
  const blobRef = useGsapParallax<HTMLDivElement>(120);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Chip 标签淡入
      gsap.fromTo('[data-hero="chip"]', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      // 头像信息行
      gsap.fromTo('[data-hero="status"]', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.15, ease: 'power2.out' });
      // 主标题逐字揭示
      gsap.fromTo('[data-hero="title"] .char', { opacity: 0, y: 80, rotateX: -90 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.7, delay: 0.3, stagger: 0.045, ease: 'back.out(1.5)' });
      // 副标题
      gsap.fromTo('[data-hero="subtitle"]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: 'power2.out' });
      // 按钮组
      gsap.fromTo('[data-hero="cta"] > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.05, stagger: 0.12, ease: 'power2.out' });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 将标题文字拆分为单字 span（用于 GSAP 逐字动画）
  const splitChars = (text: string) =>
    text.split('').map((ch, i) => (
      <Box component="span" key={i} className="char" sx={{ display: 'inline-block' }}>{ch === ' ' ? '\u00A0' : ch}</Box>
    ));

  return <Box sx={{ overflow: 'hidden', position: 'relative', bgcolor: 'background.default' }}>
    {/* 视差装饰光斑 */}
    <Box ref={blobRef} sx={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', top: -80, right: -100, bgcolor: `${theme.palette.primary.main}0A`, filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
    <Box component="section" ref={heroRef} sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', pt: { xs: 11, md: 8 }, pb: { xs: 7, md: 5 }, bgcolor: 'background.default', position: 'relative', zIndex: 1,
    }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 790 }}>
          <Box data-hero="chip"><Chip icon={<AutoAwesome sx={{ fontSize: '16px !important' }} />} label="PERSONAL SPACE · 2026" sx={{ mb: { xs: 3, md: 4 }, px: 0.75, height: 34, borderRadius: '20px', bgcolor: `${theme.palette.primary.main}16`, color: 'primary.main', fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.7rem', '& .MuiChip-icon': { color: 'primary.main' } }} /></Box>
          <Stack data-hero="status" direction="row" spacing={2} alignItems="center" sx={{ mb: { xs: 3, md: 4 } }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar src={personalInfo.avatar} alt={personalInfo.name} sx={{ width: { xs: 52, md: 64 }, height: { xs: 52, md: 64 }, border: `3px solid ${theme.palette.background.paper}`, boxShadow: `0 10px 26px ${theme.palette.primary.main}38` }} />
              <Box sx={{ position: 'absolute', right: 0, bottom: 1, width: 13, height: 13, borderRadius: '50%', bgcolor: '#59C783', border: `2px solid ${theme.palette.background.default}` }} />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '0.04em' }}>CURRENTLY EXPLORING</Typography>
              <Typography fontWeight={700}>Linux · Automation · Infrastructure</Typography>
            </Box>
          </Stack>
          <Typography data-hero="title" component="h1" sx={{ fontSize: { xs: '3.35rem', sm: '4.6rem', md: '6.7rem' }, lineHeight: 0.93, fontWeight: 800, letterSpacing: '-0.075em', perspective: 800 }}>
            {splitChars('BUILD')}<br />
            <Box component="span" sx={{ color: 'primary.main', position: 'relative', display: 'inline-block' }}>
              {splitChars('QUIETLY.')}
              <Box component="span" sx={{ position: 'absolute', width: { xs: 10, md: 14 }, height: { xs: 10, md: 14 }, right: { xs: -15, md: -20 }, top: 2, borderRadius: '50%', bgcolor: 'secondary.main' }} />
            </Box>
          </Typography>
          <Typography data-hero="subtitle" sx={{ mt: { xs: 3, md: 4 }, maxWidth: 525, fontSize: { xs: '1rem', md: '1.18rem' }, lineHeight: 1.8, color: 'text.secondary' }}>欢迎来到 {personalInfo.name} 的数字花园。记录折腾服务器、自动化工具和持续学习的每一步。</Typography>
          <Stack data-hero="cta" direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: { xs: 4, md: 5 } }}>
            <Button ref={magneticRef} component={Link} to="/about" variant="contained" endIcon={<ArrowOutward />} sx={{ px: 3.2, py: 1.35, width: { xs: '100%', sm: 'fit-content' }, boxShadow: `0 12px 28px ${theme.palette.primary.main}42`, '&:hover': { boxShadow: `0 18px 34px ${theme.palette.primary.main}55` } }}>认识我</Button>
            <Button component="a" href={personalInfo.github} target="_blank" rel="noreferrer" variant="outlined" startIcon={<GitHub />} sx={{ px: 3, py: 1.35, width: { xs: '100%', sm: 'fit-content' }, color: 'text.primary' }}>GitHub</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  </Box>;
};
