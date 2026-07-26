import React, { useState } from 'react';
import { Avatar, Box, Chip, CircularProgress, Container, Divider, Stack, Typography, useTheme } from '@mui/material';
import { AlternateEmail, ArrowOutward, GitHub, LocationOn, Telegram } from '@mui/icons-material';
import { personalInfo } from '../data/personalInfo';
import { useGsapReveal } from '../hooks/useGsapAnimations';

const ProfileAvatar: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box sx={{ position: 'relative', width: { xs: 116, md: 142 }, height: { xs: 116, md: 142 } }}>
      {!loaded && <CircularProgress size={36} sx={{ position: 'absolute', top: '40%', left: '40%' }} />}
      <Avatar
        src={error ? undefined : personalInfo.avatar}
        alt={personalInfo.name}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        sx={{
          width: '100%', height: '100%', fontSize: '2.5rem', fontWeight: 800, bgcolor: 'primary.main', opacity: loaded ? 1 : 0,
          border: '5px solid', borderColor: 'background.paper', boxShadow: '0 18px 42px rgba(60, 53, 120, 0.24)', transition: 'opacity 0.25s ease',
        }}
      >
        {personalInfo.name[0]}
      </Avatar>
      <Box sx={{ position: 'absolute', right: 5, bottom: 5, width: 18, height: 18, borderRadius: '50%', bgcolor: '#59C783', border: '3px solid', borderColor: 'background.paper' }} />
    </Box>
  );
};

export const AboutPage: React.FC = () => {
  const theme = useTheme();
  const containerRef = useGsapReveal<HTMLDivElement>();

  const contacts = [
    { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: <AlternateEmail /> },
    { label: 'GitHub', value: 'qichenya', href: personalInfo.github, icon: <GitHub /> },
    { label: 'Telegram', value: 'qichen_sama', href: personalInfo.telegram, icon: <Telegram /> },
  ];

  return (
    <Box ref={containerRef} sx={{ minHeight: '100vh', py: { xs: 11, md: 14 }, overflow: 'hidden', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box data-gsap-reveal sx={{ display: 'flex', alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 5 }, mb: { xs: 6, md: 9 } }}>
          <ProfileAvatar />
          <Box>
            <Chip label="ABOUT ME" size="small" sx={{ mb: 1.75, bgcolor: `${theme.palette.primary.main}15`, color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.65rem' }} />
            <Typography component="h1" sx={{ fontSize: { xs: '2.7rem', md: '4rem' }, lineHeight: 1, fontWeight: 800, letterSpacing: '-0.06em', mb: 1 }}>{personalInfo.name}</Typography>
            <Stack direction="row" spacing={0.75} alignItems="center" color="text.secondary">
              <LocationOn sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography>{personalInfo.location}</Typography>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.secondary', mx: 0.5 }} />
              <Typography>持续学习中</Typography>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.45fr) minmax(270px, 0.75fr)' }, gap: { xs: 3, md: 4 }, alignItems: 'start' }}>
          <Box data-gsap-reveal data-gsap-delay="0.1" sx={{ p: { xs: 3, md: 4.5 }, borderRadius: 4, bgcolor: 'background.paper', border: `1px solid ${theme.palette.primary.main}1C`, boxShadow: `0 20px 50px ${theme.palette.primary.main}0D` }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.14em' }}>01 / INTRODUCTION</Typography>
            <Typography variant="h4" sx={{ mt: 1, mb: 2.5, fontWeight: 800, letterSpacing: '-0.035em' }}>你好，很高兴认识你。</Typography>
            <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 2, fontSize: { xs: '1rem', md: '1.06rem' } }}>{personalInfo.bio}</Typography>
          </Box>

          <Stack spacing={3}>
            <Box data-gsap-reveal data-gsap-delay="0.2" sx={{ p: 3.25, borderRadius: 4, bgcolor: `${theme.palette.primary.main}12`, border: `1px solid ${theme.palette.primary.main}22` }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.14em' }}>02 / INTERESTS</Typography>
              <Typography variant="h6" sx={{ mt: 0.75, mb: 2.25, fontWeight: 800 }}>正在投入的方向</Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {personalInfo.interests.map((interest) => <Chip key={interest} label={interest} sx={{ bgcolor: 'background.paper', color: 'text.primary', fontWeight: 700, boxShadow: `0 4px 12px ${theme.palette.primary.main}12` }} />)}
                <Chip label="Automation" variant="outlined" sx={{ borderColor: `${theme.palette.primary.main}55`, color: 'primary.main', fontWeight: 700 }} />
                <Chip label="Homelab" variant="outlined" sx={{ borderColor: `${theme.palette.primary.main}55`, color: 'primary.main', fontWeight: 700 }} />
              </Stack>
            </Box>

            <Box data-gsap-reveal data-gsap-delay="0.3" sx={{ p: 3.25, borderRadius: 4, bgcolor: 'background.paper', border: `1px solid ${theme.palette.primary.main}1C` }}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.14em' }}>03 / CONTACT</Typography>
              <Stack divider={<Divider flexItem sx={{ borderColor: `${theme.palette.primary.main}16` }} />} sx={{ mt: 1.25 }}>
                {contacts.map((contact) => (
                  <Stack key={contact.label} component="a" href={contact.href} target={contact.label === 'Email' ? undefined : '_blank'} rel="noreferrer" direction="row" alignItems="center" spacing={1.25} sx={{ py: 1.3, color: 'inherit', textDecoration: 'none', '&:hover': { '& .contact-arrow': { transform: 'translate(3px, -3px)', color: 'primary.main' } } }}>
                    <Box sx={{ color: 'primary.main', display: 'grid', placeItems: 'center' }}>{contact.icon}</Box>
                    <Box sx={{ minWidth: 0, flexGrow: 1 }}><Typography variant="caption" color="text.secondary">{contact.label}</Typography><Typography noWrap fontWeight={700}>{contact.value}</Typography></Box>
                    <ArrowOutward className="contact-arrow" sx={{ color: 'text.secondary', fontSize: 18, transition: 'all 0.2s ease' }} />
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
