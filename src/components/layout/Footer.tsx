import React from 'react';
import { Box } from '@mui/material';
import { FONT_MONO, PAGE_MAX_WIDTH } from '../../theme/theme';

const MOE_ICP_NUMBER = '20264169';
const MOE_ICP_LABEL = `萌ICP备${MOE_ICP_NUMBER}号`;
const MOE_ICP_URL = `https://icp.gov.moe/?keyword=${MOE_ICP_NUMBER}`;

export const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto',
      borderTop: '1px solid',
      borderColor: 'divider',
      py: 3.5,
    }}
  >
    <Box sx={{ maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          fontFamily: FONT_MONO,
          fontSize: 12,
          letterSpacing: '0.08em',
          color: 'text.secondary',
        }}
      >
        <Box component="span">© {new Date().getFullYear()} QICHEN</Box>
        <Box component="span" sx={{ textTransform: 'uppercase' }}>Built with care.</Box>
      </Box>

      {/* 萌备（MoeICP）要求页脚常驻链接，桌面端与移动端都必须可见 */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Box
          component="a"
          href={MOE_ICP_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="萌国ICP备案 · 前往萌备查询"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.4,
            borderRadius: '999px',
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            fontFamily: FONT_MONO,
            fontSize: 11,
            lineHeight: 1.6,
            letterSpacing: '0.04em',
            transition: 'color .2s ease, border-color .2s ease',
            '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
            '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
          }}
        >
          {MOE_ICP_LABEL}
        </Box>
      </Box>
    </Box>
  </Box>
);
