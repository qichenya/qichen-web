import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  alpha,
} from '@mui/material';
import { Search, ArrowBack } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';

const searchEngineUrls: Record<string, string> = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  baidu: 'https://www.baidu.com/s?wd=',
};

const engineNames: Record<string, string> = {
  google: 'Google',
  bing: 'Bing',
  baidu: '百度',
};

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const engine = searchParams.get('engine') || 'google';

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = searchEngineUrls[engine] + encodeURIComponent(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2, py: 1 }}>
        <IconButton onClick={() => navigate('/')} sx={{ color: 'text.primary' }}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
          搜索 - {engineNames[engine]}
        </Typography>

        <TextField
          fullWidth
          placeholder="输入搜索内容..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 4,
              py: 1,
              '& fieldset': {
                borderColor: 'divider',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
          }}
          sx={{ mb: 4 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            startIcon={<Search />}
            disabled={!query.trim()}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 4,
            }}
          >
            搜索
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
