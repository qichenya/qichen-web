import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const Footer: React.FC = () => (
  <Box component="footer" sx={{ py: 3.5, mt: 'auto' }}>
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', color: 'text.secondary' }}>
      <Typography variant="body2">© {new Date().getFullYear()} QICHEN</Typography>
      <Typography variant="body2">Built with care.</Typography>
    </Container>
  </Box>
);
