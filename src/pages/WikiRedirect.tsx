import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import { CheckCircle, ErrorOutline, ArrowForward } from '@mui/icons-material';

const TARGETS = [
  { label: 'wiki.qichen.ink', url: 'https://wiki.qichen.ink' },
  { label: 'wiki.qichen.icu', url: 'https://wiki.qichen.icu' },
];

type Status = 'testing' | 'available' | 'unavailable';

const checkUrl = (url: string, timeout = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      resolve(false);
    }, timeout);

    fetch(url, { mode: 'no-cors', signal: controller.signal })
      .then(() => {
        clearTimeout(timer);
        resolve(true);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(false);
      });
  });
};

export const WikiRedirect: React.FC = () => {
  const theme = useTheme();
  const [phase, setPhase] = useState<'testing' | 'ready' | 'failed'>('testing');
  const [results, setResults] = useState<Record<string, Status>>({});

  useEffect(() => {
    const runTests = async () => {
      const res: Record<string, Status> = {};
      for (let i = 0; i < TARGETS.length; i++) {
        res[TARGETS[i].label] = 'testing';
        setResults({ ...res });

        const ok = await checkUrl(TARGETS[i].url, 6000);
        res[TARGETS[i].label] = ok ? 'available' : 'unavailable';
        setResults({ ...res });
      }
      const anyAvailable = TARGETS.some((t) => res[t.label] === 'available');
      setPhase(anyAvailable ? 'ready' : 'failed');
    };

    runTests();
  }, []);

  const handleGo = (label: string) => {
    const target = TARGETS.find((t) => t.label === label);
    if (target) window.location.href = target.url;
  };

  const getIcon = (status: Status) => {
    if (status === 'testing') return <CircularProgress size={20} sx={{ color: 'primary.main' }} />;
    if (status === 'available') return <CheckCircle sx={{ color: '#4CAF50' }} />;
    return (<Tooltip title="无法连接，请检查网络" arrow disableFocusListener disableTouchListener><ErrorOutline sx={{ color: 'error.main' }} /></Tooltip>);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          bgcolor: 'surface.main',
          borderRadius: '16px',
          p: { xs: 4, sm: 5 },
          textAlign: 'center',
          boxShadow: `0 1px 3px ${alpha(theme.palette.primary.main, 0.08)}, 0 4px 24px ${alpha(theme.palette.primary.main, 0.06)}`,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '14px',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            {phase === 'testing' ? (
              <CircularProgress size={40} sx={{ color: 'primary.main' }} />
            ) : phase === 'ready' ? (
              <CheckCircle sx={{ fontSize: 40, color: '#4CAF50' }} />
            ) : (
              <ErrorOutline sx={{ fontSize: 40, color: 'error.main' }} />
            )}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {phase === 'testing' && '正在检测连接...'}
            {phase === 'ready' && '检测完成'}
            {phase === 'failed' && '所有链接均无法访问'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {phase === 'testing' && '请稍候，正在测试 Wiki 站点可用性'}
            {phase === 'ready' && '以下站点可用，点击前往'}
            {phase === 'failed' && '请检查网络连接后重试'}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'surface.variant',
            borderRadius: '12px',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {TARGETS.map((t, i) => {
            const status = results[t.label] || 'testing';
            const isClickable = phase === 'ready' && status === 'available';
            return (
              <Box
                key={t.label}
                onClick={isClickable ? () => handleGo(t.label) : undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  borderRadius: '8px',
                  cursor: isClickable ? 'pointer' : 'default',
                  bgcolor: status === 'available'
                    ? alpha('#4CAF50', 0.08)
                    : status === 'unavailable'
                    ? alpha(theme.palette.error.main, 0.06)
                    : alpha(theme.palette.primary.main, 0.04),
                  transition: 'background-color 0.3s ease, transform 0.15s ease',
                  '&:hover': isClickable ? {
                    bgcolor: alpha('#4CAF50', 0.16),
                    transform: 'scale(1.02)',
                  } : {},
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: status === 'unavailable' ? 'text.disabled' : 'text.primary',
                    }}
                  >
                    {i === 0 && '优先 '}
                    {t.label}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isClickable && <ArrowForward sx={{ fontSize: 18, color: '#4CAF50' }} />}
                  {getIcon(status)}
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 1.5, justifyContent: 'center' }}>
          {phase === 'failed' && (
            <Box
              component="button"
              onClick={() => window.location.reload()}
              sx={{
                border: 'none',
                cursor: 'pointer',
                bgcolor: 'primary.main',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.875rem',
                py: 1.25,
                px: 3,
                borderRadius: 99,
                '&:hover': { opacity: 0.88 },
              }}
            >
              重新检测
            </Box>
          )}
          <Box
            component="button"
            onClick={() => window.history.back()}
            sx={{
              border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
              cursor: 'pointer',
              bgcolor: 'transparent',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.875rem',
              py: 1.25,
              px: 3,
              borderRadius: 99,
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.06) },
            }}
          >
            返回
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
