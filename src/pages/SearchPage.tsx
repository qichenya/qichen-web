import React, { useState } from 'react';
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';

const searchEngineUrls: Record<string, string> = { google: 'https://www.google.com/search?q=', bing: 'https://www.bing.com/search?q=', baidu: 'https://www.baidu.com/s?wd=' };
const engineNames: Record<string, string> = { google: 'Google', bing: 'Bing', baidu: '百度' };

export const SearchPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const engine = params.get('engine') || 'google';
  const search = () => { if (query.trim()) window.location.href = searchEngineUrls[engine] + encodeURIComponent(query); };

  return <Box sx={{ minHeight: '100vh', pt: 10 }}>
    <Box sx={{ px: 2, py: 2 }}><IconButton onClick={() => navigate('/')} aria-label="返回首页" sx={{ bgcolor: 'primary.container', color: 'primary.onContainer' }}><ArrowBack /></IconButton></Box>
    <Container maxWidth="sm" sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 10 }}>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 1.25, fontWeight: 800 }}>搜索 {engineNames[engine]}</Typography>
      <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>输入关键词，开始探索。</Typography>
      <TextField fullWidth autoFocus placeholder="输入搜索内容…" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') search(); }} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
      <Button variant="contained" size="large" onClick={search} disabled={!query.trim()} startIcon={<Search />} sx={{ mt: 2, alignSelf: 'center' }}>搜索</Button>
    </Container>
  </Box>;
};
