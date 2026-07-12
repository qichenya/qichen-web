import React from 'react';
import { Avatar, Box, Container, Stack, Typography, useTheme } from '@mui/material';
import { ArrowOutward, Link as LinkIcon } from '@mui/icons-material';
import { motion, useReducedMotion } from 'framer-motion';
import { friendLinks } from '../data/friendLinks';

const MotionBox = motion(Box);

const getInitial = (name: string) => name.trim().charAt(0).toUpperCase();

export const LinksPage: React.FC = () => {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 11, md: 14 }, overflow: 'hidden', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          sx={{ maxWidth: 690, mb: { xs: 6, md: 8 } }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.main', mb: 2 }}>
            <LinkIcon sx={{ fontSize: 20 }} />
            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.16em' }}>FRIEND LINKS</Typography>
          </Stack>
          <Typography component="h1" sx={{ fontSize: { xs: '3rem', md: '4.7rem' }, lineHeight: 0.95, fontWeight: 800, letterSpacing: '-0.07em', mb: 2.2 }}>
            值得常去<br /><Box component="span" sx={{ color: 'primary.main' }}>的角落。</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.12rem' }, lineHeight: 1.8, maxWidth: 460 }}>
            这里收藏了一些朋友的个人空间。点击卡片，去看看他们正在创造什么。
          </Typography>
        </MotionBox>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 2.25 }}>
          {friendLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.09 }}
              style={{ height: '100%' }}
            >
              <Box
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minHeight: 215, p: 3, borderRadius: 4, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: 'inherit', textDecoration: 'none',
                bgcolor: 'background.paper', border: `1px solid ${theme.palette.primary.main}1C`, boxShadow: `0 12px 28px ${theme.palette.primary.main}08`,
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
                '&::before': { content: '""', position: 'absolute', width: 170, height: 170, borderRadius: '50%', right: -75, bottom: -85, bgcolor: `${theme.palette.primary.main}11`, transition: 'transform 0.4s ease' },
                '&:hover': { transform: 'translateY(-7px)', borderColor: `${theme.palette.primary.main}65`, boxShadow: `0 22px 42px ${theme.palette.primary.main}18`, '&::before': { transform: 'scale(1.38)' }, '& .link-arrow': { transform: 'translate(3px, -3px)', color: 'primary.main' } },
              }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ position: 'relative', zIndex: 1 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: `${theme.palette.primary.main}16`, color: 'primary.main', fontWeight: 800, fontSize: '1.35rem' }}>{getInitial(link.name)}</Avatar>
                <ArrowOutward className="link-arrow" sx={{ color: 'text.secondary', transition: 'all 0.25s ease' }} />
              </Stack>
              <Box sx={{ mt: 'auto', position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.025em', mb: 0.7 }}>{link.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{link.description}</Typography>
                <Typography variant="caption" sx={{ display: 'block', color: 'primary.main', fontWeight: 700, mt: 1.5 }}>{new URL(link.url).hostname}</Typography>
              </Box>
              </Box>
            </motion.div>
          ))}

          <MotionBox
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 + friendLinks.length * 0.09 }}
            sx={{ minHeight: 215, p: 3, borderRadius: 4, border: `1px dashed ${theme.palette.primary.main}65`, display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: `${theme.palette.primary.main}08` }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>想交换友链？</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>欢迎通过关于页的联系方式找到我，一起把这片互联网的小角落连接起来。</Typography>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};
