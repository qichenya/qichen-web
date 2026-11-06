import React, { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';

const searchEngineUrls: Record<string, string> = { google: 'https://www.google.com/search?q=', bing: 'https://www.bing.com/search?q=', baidu: 'https://www.baidu.com/s?wd=' };
const engineNames: Record<string, string> = { google: 'Google', bing: 'Bing', baidu: '百度' };

const kickerSx = {
  fontFamily: FONT_MONO,
  fontSize: 9,
  letterSpacing: '1.6px',
  color: 'primary.main',
  textTransform: 'uppercase',
} as const;

export const SearchPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const engine = params.get('engine') || 'google';
  const search = () => { if (query.trim()) window.location.href = searchEngineUrls[engine] + encodeURIComponent(query); };

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 11, md: 13 }, pb: 8 }}>
      <Box sx={{ maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 3 }}>
        <IconButton
          onClick={() => navigate('/')}
          aria-label="返回首页"
          sx={{ width: 40, height: 40, border: '1px solid', borderColor: 'divider' }}
        >
          <ArrowBack sx={{ fontSize: 17 }} />
        </IconButton>

        <Box sx={{ mt: { xs: 6, md: 8 } }}>
          <Typography sx={kickerSx}>SEARCH / {engineNames[engine]}</Typography>
          <Typography
            component="h1"
            sx={{ mt: 1.5, fontFamily: FONT_DOTS, fontWeight: 900, fontSize: { xs: '2.8rem', md: '3.4rem' }, lineHeight: 0.95, letterSpacing: '2px' }}
          >
            SEARCH.
          </Typography>
          <Typography sx={{ mt: 2, mb: 3.5, fontSize: 13.5, color: 'text.secondary' }}>
            输入关键词，开始探索。
          </Typography>

          <TextField
            fullWidth
            autoFocus
            placeholder="输入搜索内容…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') search(); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { height: 48 } }}
          />

          <Button variant="contained" onClick={search} disabled={!query.trim()} sx={{ mt: 2 }}>
            搜索
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
