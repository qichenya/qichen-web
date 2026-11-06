import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { AlternateEmail, ArrowOutward, GitHub, Telegram } from '@mui/icons-material';
import { personalInfo } from '../data/personalInfo';
import { skills } from '../data/skills';
import { timelineItems } from '../data/timeline';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProfileAvatar: React.FC = () => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded || !avatarRef.current) return;

    gsap.fromTo(
      avatarRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [loaded]);

  return (
    <Box ref={avatarRef} sx={{ position: 'relative', width: { xs: 92, md: 112 }, height: { xs: 92, md: 112 }, flex: 'none' }}>
      {!loaded && <CircularProgress size={28} sx={{ position: 'absolute', top: '38%', left: '38%', color: 'primary.main' }} />}
      <Avatar
        src={error ? undefined : personalInfo.avatar}
        alt={personalInfo.name}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        sx={{
          width: '100%', height: '100%', borderRadius: '50%', fontSize: '2rem', fontWeight: 700,
          bgcolor: 'background.paper', color: 'primary.main', opacity: loaded ? 1 : 0, transition: 'opacity .25s ease',
        }}
      >
        {personalInfo.name[0]}
      </Avatar>
      <Box
        sx={{
          position: 'absolute',
          right: 4,
          bottom: 4,
          width: 13,
          height: 13,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          boxShadow: `0 0 0 3px ${theme.palette.background.default}`,
        }}
      />
    </Box>
  );
};

const SectionHead: React.FC<{ en: string; index: string }> = ({ en, index }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      pb: 1.25,
      mb: 2.25,
      borderBottom: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Typography sx={{ fontFamily: FONT_DOTS, fontWeight: 900, fontSize: { xs: '1.5rem', md: '1.75rem' }, lineHeight: 1, letterSpacing: '1.5px' }}>
      {en}
    </Typography>
    <Typography sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1.6px', color: 'primary.main' }}>
      {index}
    </Typography>
  </Box>
);

const kickerSx = {
  fontFamily: FONT_MONO,
  fontSize: 9,
  letterSpacing: '1.6px',
  color: 'primary.main',
  textTransform: 'uppercase',
} as const;

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-gsap-reveal]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      gsap.fromTo('[data-gsap-timeline]', { opacity: 0, x: -16 }, {
        opacity: 1,
        x: 0,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-gsap-timeline]', start: 'top 88%' },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const contacts = [
    { label: 'EMAIL', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: <AlternateEmail sx={{ fontSize: 16 }} /> },
    { label: 'GITHUB', value: 'qichenya', href: personalInfo.github, icon: <GitHub sx={{ fontSize: 16 }} /> },
    { label: 'TELEGRAM', value: 'qichen_sama', href: personalInfo.telegram, icon: <Telegram sx={{ fontSize: 16 }} /> },
  ];

  return (
    <Box ref={containerRef} sx={{ minHeight: '100vh', pt: { xs: 12, md: 15 }, pb: { xs: 8, md: 10 }, overflow: 'hidden' }}>
      <Box sx={{ maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 3 }}>
        <Box
          data-gsap-reveal
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2.5, md: 3.5 },
            pb: 3.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <ProfileAvatar />
          <Box>
            <Typography sx={{ ...kickerSx, mb: 1.5 }}>ABOUT ME / 02</Typography>
            <Typography
              component="h1"
              sx={{ fontFamily: FONT_DOTS, fontWeight: 900, fontSize: { xs: '3rem', md: '4rem' }, lineHeight: 0.95, letterSpacing: '2px' }}
            >
              QICHEN.
            </Typography>
            <Typography sx={{ mt: 1.25, fontFamily: FONT_MONO, fontSize: 11.5, letterSpacing: '0.06em', color: 'text.secondary' }}>
              {personalInfo.location} · 持续学习中
            </Typography>
          </Box>
        </Box>

        <Box
          data-gsap-reveal
          sx={{
            mt: { xs: 4, md: 5 },
            p: { xs: 2.5, md: 3 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '2px',
            bgcolor: 'background.paper',
          }}
        >
          <Typography sx={kickerSx}>01 / INTRODUCTION</Typography>
          <Typography sx={{ mt: 1.25, mb: 2, fontSize: 15, fontWeight: 500, letterSpacing: '0.02em' }}>
            你好，很高兴认识你。
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ whiteSpace: 'pre-line', fontSize: { xs: 13.5, md: 14.5 }, lineHeight: 1.95 }}
          >
            {personalInfo.bio}
          </Typography>
        </Box>

        <Box data-gsap-reveal sx={{ mt: { xs: 5, md: 6 } }}>
          <SectionHead en="FOCUS" index="02 / INTERESTS" />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {personalInfo.focusDirections.map((dir) => (
              <Box
                key={dir.name}
                sx={{
                  px: 1.5,
                  py: 0.65,
                  borderRadius: '2px',
                  border: '1px solid',
                  borderColor: dir.outlined ? 'divider' : 'primary.main',
                  bgcolor: dir.outlined ? 'transparent' : 'primary.main',
                  color: dir.outlined ? 'text.primary' : '#FFFFFF',
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                }}
              >
                {dir.name}
              </Box>
            ))}
          </Stack>
        </Box>

        <Box data-gsap-reveal sx={{ mt: { xs: 5, md: 6 } }}>
          <SectionHead en="CONTACT" index="03 / CHANNELS" />
          <Box>
            {contacts.map((contact, index) => (
              <Box
                key={contact.label}
                component="a"
                href={contact.href}
                target={contact.label === 'EMAIL' ? undefined : '_blank'}
                rel="noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.75,
                  py: 1.6,
                  borderTop: index === 0 ? 'none' : '1px solid',
                  borderColor: 'divider',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover .contact-label': { color: 'primary.main' },
                  '&:hover .contact-arrow': { color: 'primary.main', transform: 'translate(2px, -2px)' },
                }}
              >
                <Box component="span" sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1px', color: 'primary.main', width: 22 }}>
                  {String(index + 1).padStart(2, '0')}
                </Box>
                <Box sx={{ color: 'text.secondary', display: 'grid', placeItems: 'center', width: 20 }}>{contact.icon}</Box>
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography className="contact-label" sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1.4px', color: 'text.secondary', transition: 'color .2s ease' }}>
                    {contact.label}
                  </Typography>
                  <Typography noWrap sx={{ fontSize: 13.5, fontWeight: 500, mt: 0.25 }}>{contact.value}</Typography>
                </Box>
                <ArrowOutward className="contact-arrow" sx={{ fontSize: 16, color: 'text.secondary', transition: 'all .2s ease' }} />
              </Box>
            ))}
          </Box>
        </Box>

        <Box data-gsap-reveal sx={{ mt: { xs: 5, md: 6 } }}>
          <SectionHead en="SKILLS" index="04 / STACK" />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' },
              gap: '1px',
              bgcolor: 'divider',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {skills.map((skill, index) => (
              <Box
                key={skill.name}
                sx={{
                  bgcolor: 'background.default',
                  p: 1.75,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  transition: 'background-color .2s ease',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                <Typography sx={{ fontFamily: FONT_MONO, fontSize: 8.5, letterSpacing: '1.2px', color: 'primary.main' }}>
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{skill.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box data-gsap-reveal sx={{ mt: { xs: 5, md: 6 } }}>
          <SectionHead en="TIMELINE" index="05 / LOG" />
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            {timelineItems.map((item, index) => (
              <Box
                key={`${item.id}-${index}`}
                data-gsap-timeline
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '82px 1fr', md: '104px 1fr' },
                  columnGap: 2,
                  rowGap: 0.5,
                  py: 1.9,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box>
                  <Typography sx={{ fontFamily: FONT_MONO, fontSize: 9.5, letterSpacing: '0.02em', color: 'primary.main' }}>
                    {item.date}
                  </Typography>
                  <Typography sx={{ fontFamily: FONT_MONO, fontSize: 7.5, letterSpacing: '1px', color: 'text.secondary', mt: 0.5 }}>
                    {item.organization.toUpperCase()}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.6 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.25, lineHeight: 1.7 }}>{item.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
