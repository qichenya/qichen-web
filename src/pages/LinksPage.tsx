import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowOutward } from '@mui/icons-material';
import { friendLinks } from '../data/friendLinks';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LinksPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 跳转前先进入检查页：可访问则自动跳转，不可访问则展示错误页
  const openWithCheck = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const href = `/link-error?target=${encodeURIComponent(url)}`;
    const opened = window.open(href, '_blank');
    if (!opened) window.location.href = href;
  };

  useEffect(() => {
    const scope = containerRef.current;
    if (!scope) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-links="header"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('[data-links="row"]', { opacity: 0, x: -14 }, {
        opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-links="grid"]', start: 'top 88%' },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={containerRef} sx={{ minHeight: '100vh', pt: { xs: 12, md: 15 }, pb: { xs: 8, md: 10 }, overflow: 'hidden' }}>
      <Box sx={{ maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 3 }}>
        <Box data-links="header">
          <Typography sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1.6px', color: 'primary.main' }}>
            FRIEND LINKS / 04
          </Typography>
          <Typography
            component="h1"
            sx={{ mt: 1.5, fontFamily: FONT_DOTS, fontWeight: 900, fontSize: { xs: '2.9rem', sm: '3.6rem' }, lineHeight: 0.95, letterSpacing: '2px' }}
          >
            ELSEWHERE.
          </Typography>
          <Typography sx={{ mt: 2, fontSize: { xs: 13.5, md: 14.5 }, lineHeight: 1.85, color: 'text.secondary', maxWidth: 460 }}>
            这里收藏了一些朋友的个人空间。点开任一条目，去看看他们正在创造什么。
          </Typography>
        </Box>

        <Box data-links="grid" sx={{ mt: { xs: 4, md: 5 }, borderTop: '1px solid', borderColor: 'divider' }}>
          {friendLinks.map((link, index) => (
            <Box
              key={link.name}
              data-links="row"
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => openWithCheck(event, link.url)}
              sx={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr auto',
                columnGap: 1.75,
                rowGap: 0.5,
                alignItems: 'baseline',
                py: 2.1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'inherit',
                textDecoration: 'none',
                transition: 'background-color .2s ease',
                '&:hover .link-name': { color: 'primary.main' },
                '&:hover .link-arrow': { color: 'primary.main', transform: 'translate(2px, -2px)' },
              }}
            >
              <Box component="span" sx={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: '0.06em', color: 'primary.main' }}>
                {String(index + 1).padStart(2, '0')}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography className="link-name" sx={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.02em', transition: 'color .2s ease' }}>
                  {link.name}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5, lineHeight: 1.7 }}>
                  {link.description}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="span"
                  sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: FONT_MONO, fontSize: 9.5, letterSpacing: '0.04em', color: 'text.secondary' }}
                >
                  {new URL(link.url).hostname}
                </Box>
                <ArrowOutward className="link-arrow" sx={{ fontSize: 14, color: 'text.secondary', transition: 'all .2s ease' }} />
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          data-links="row"
          sx={{ mt: 4, px: 2, py: 2.25, border: '1px dashed', borderColor: 'divider', borderRadius: '2px' }}
        >
          <Typography sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1.4px', color: 'primary.main', mb: 1 }}>
            EXCHANGE
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.8 }}>
            欢迎通过关于页的联系方式找到我，一起把这片互联网的小角落连接起来。
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
