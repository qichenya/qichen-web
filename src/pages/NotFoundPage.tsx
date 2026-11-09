import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { ArrowBack, Reply } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';

const mono = (size: number, spacing = '0.02em') => ({
  fontFamily: FONT_MONO,
  fontSize: size,
  letterSpacing: spacing,
  lineHeight: 'normal',
});

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const requested = `${location.pathname}${location.search}`;

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <Box sx={{ pt: { xs: 11, md: 14 }, pb: { xs: 8, md: 10 } }}>
      <Box sx={{ maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 3 }}>
        <Box
          sx={{
            maxWidth: 404,
            mx: 'auto',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '4px',
            p: { xs: 2.5, sm: 4 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 6, height: 6, bgcolor: 'primary.main' }} />
              <Box component="span" sx={{ ...mono(10.5, '1.5px'), color: 'primary.main', whiteSpace: 'nowrap' }}>
                ERROR / 404
              </Box>
            </Box>
            <Box component="span" sx={{ ...mono(10.5, '1.2px'), color: 'text.secondary', whiteSpace: 'nowrap' }}>
              HTTP 404
            </Box>
          </Box>

          <Box sx={{ height: 6 }} />

          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '14px', pt: 3 }}>
            <Box
              component="span"
              sx={{
                fontFamily: FONT_DOTS,
                fontWeight: 900,
                fontSize: { xs: 108, sm: 132 },
                letterSpacing: '-1px',
                lineHeight: { xs: '88px', sm: '108px' },
                color: 'text.primary',
              }}
            >
              404
            </Box>
            <Box sx={{ pb: '22px' }}>
              <Box component="span" sx={{ display: 'block', width: 16, height: 16, bgcolor: 'primary.main' }} />
            </Box>
          </Box>

          <Box sx={{ height: 10 }} />

          <Typography sx={{ fontSize: 20, fontWeight: 500, letterSpacing: '0.4px', lineHeight: '30px' }}>
            页面走丢了。
          </Typography>

          <Box sx={{ height: 8 }} />

          <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: '25px' }}>
            这个地址没有对应任何页面。也许它被移动过，或者链接里有一个字打错了。
          </Typography>

          <Box sx={{ height: 24 }} />

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '2px',
              p: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Box component="span" sx={{ ...mono(10, '1.5px'), color: 'text.disabled', whiteSpace: 'nowrap' }}>
                REQUESTED
              </Box>
              <Box component="span" sx={{ ...mono(10, '1.5px'), color: 'text.disabled', whiteSpace: 'nowrap' }}>
                GET
              </Box>
            </Box>
            <Box
              component="span"
              sx={{ ...mono(13, '0.2px'), color: 'text.secondary', wordBreak: 'break-all' }}
            >
              {requested}
            </Box>
          </Box>

          <Box sx={{ height: 24 }} />

          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box
              component="button"
              type="button"
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flex: '1 1 0',
                height: 42,
                px: 2,
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                bgcolor: 'primary.main',
                color: '#FFFFFF',
                ...mono(14, '0.2px'),
                transition: 'opacity .2s ease',
                '&:hover': { opacity: 0.82 },
              }}
            >
              <ArrowBack sx={{ fontSize: 16 }} />
              返回首页
            </Box>
            <Box
              component="button"
              type="button"
              onClick={goBack}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                height: 42,
                px: 2,
                borderRadius: '2px',
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                bgcolor: 'transparent',
                color: 'text.primary',
                ...mono(14, '0.2px'),
                transition: 'border-color .2s ease',
                '&:hover': { borderColor: 'text.primary' },
              }}
            >
              上一页
              <Reply sx={{ fontSize: 15, transform: 'scaleX(-1)' }} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 6 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            height: { xs: 96, sm: 130, md: 160 },
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            userSelect: 'none',
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: FONT_DOTS,
              fontWeight: 900,
              fontSize: { xs: 96, sm: 128, md: 158 },
              lineHeight: 0.85,
              letterSpacing: '-2px',
              color: alpha(theme.palette.text.primary, 0.06),
              whiteSpace: 'nowrap',
            }}
          >
            QICHEN
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
