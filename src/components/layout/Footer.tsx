import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

const MOE_ICP_NUMBER = '20264169';
const MOE_ICP_LABEL = `萌ICP备${MOE_ICP_NUMBER}号`;
const MOE_ICP_URL = `https://icp.gov.moe/?keyword=${MOE_ICP_NUMBER}`;

export const Footer: React.FC = () => (
  <Box component="footer" sx={{ py: 3.5, mt: 'auto' }}>
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">© {new Date().getFullYear()} QICHEN</Typography>
        <Typography variant="body2">Built with care.</Typography>
      </Box>

      {/* 萌备（MoeICP）要求页脚常驻链接，桌面端与移动端都必须可见 */}
      <Box sx={{ mt: 1.75, display: 'flex', justifyContent: 'center' }}>
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
            py: 0.5,
            borderRadius: '999px',
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            typography: 'caption',
            lineHeight: 1.5,
            letterSpacing: '0.06em',
            transition: 'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
            '&:hover': {
              color: 'primary.main',
              borderColor: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          }}
        >
          {MOE_ICP_LABEL}
        </Box>
      </Box>
    </Container>
  </Box>
);
