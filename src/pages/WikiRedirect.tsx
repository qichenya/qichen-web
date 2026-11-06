import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import { ArrowForward, CheckCircle, ErrorOutline } from '@mui/icons-material';
import { FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';

const TARGETS = [
  { label: 'wiki.qichen.ink', url: 'https://wiki.qichen.ink' },
  { label: 'wiki.qichen.icu', url: 'https://wiki.qichen.icu' },
];

type Status = 'testing' | 'available' | 'unavailable';

const statusLabel: Record<Status, string> = {
  testing: 'TESTING',
  available: 'ONLINE',
  unavailable: 'OFFLINE',
};

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
    if (status === 'testing') return <CircularProgress size={15} thickness={5} sx={{ color: 'text.secondary' }} />;
    if (status === 'available') return <CheckCircle sx={{ fontSize: 17, color: 'text.primary' }} />;
    return (
      <Tooltip title="无法连接，请检查网络" arrow disableFocusListener disableTouchListener>
        <ErrorOutline sx={{ fontSize: 17, color: 'error.main' }} />
      </Tooltip>
    );
  };

  const phaseTitle = phase === 'testing' ? '正在检测连接' : phase === 'ready' ? '检测完成' : '所有链接均无法访问';
  const phaseCaption = phase === 'testing'
    ? '请稍候，正在测试 Wiki 站点可用性'
    : phase === 'ready'
      ? '以下站点可用，点击前往'
      : '请检查网络连接后重试';

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 11, md: 14 }, pb: 8, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: PAGE_MAX_WIDTH, mx: 'auto', px: 3 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '2px', bgcolor: 'background.paper' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2.5,
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              fontFamily: FONT_MONO,
              fontSize: 9,
              letterSpacing: '1.6px',
              color: 'text.secondary',
            }}
          >
            <Box component="span">CONNECTION CHECK</Box>
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'primary.main' }}>
              <Box component="span" sx={{ width: 5, height: 5, bgcolor: 'primary.main' }} />
              {phase === 'testing' ? 'SCANNING' : phase === 'ready' ? 'READY' : 'FAILED'}
            </Box>
          </Box>

          <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Box sx={{ width: 44, height: 44, border: '1px solid', borderColor: 'divider', display: 'grid', placeItems: 'center', mb: 2.5 }}>
              {phase === 'testing' ? (
                <CircularProgress size={20} thickness={4} sx={{ color: 'primary.main' }} />
              ) : phase === 'ready' ? (
                <CheckCircle sx={{ fontSize: 22, color: 'text.primary' }} />
              ) : (
                <ErrorOutline sx={{ fontSize: 22, color: 'error.main' }} />
              )}
            </Box>

            <Typography sx={{ fontSize: 16, fontWeight: 500, letterSpacing: '0.02em' }}>{phaseTitle}</Typography>
            <Typography sx={{ mt: 0.75, fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: '0.04em', color: 'text.secondary' }}>
              {phaseCaption}
            </Typography>

            <Box sx={{ mt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
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
                      gap: 1.5,
                      py: 1.6,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      cursor: isClickable ? 'pointer' : 'default',
                      transition: 'background-color .2s ease',
                      '&:hover': isClickable ? { bgcolor: alpha(theme.palette.text.primary, 0.04) } : {},
                    }}
                  >
                    <Box component="span" sx={{ fontFamily: FONT_MONO, fontSize: 9, letterSpacing: '1px', color: 'primary.main', width: 20 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Box>
                    <Typography sx={{ flexGrow: 1, fontFamily: FONT_MONO, fontSize: 12.5, letterSpacing: '0.02em', color: status === 'unavailable' ? 'text.disabled' : 'text.primary' }}>
                      {t.label}
                    </Typography>
                    <Box component="span" sx={{ fontFamily: FONT_MONO, fontSize: 8.5, letterSpacing: '1.2px', color: status === 'unavailable' ? 'error.main' : 'text.secondary' }}>
                      {statusLabel[status]}
                    </Box>
                    {isClickable && <ArrowForward sx={{ fontSize: 15, color: 'text.primary' }} />}
                    {getIcon(status)}
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: 3, display: 'flex', gap: 1.25 }}>
              {phase === 'failed' && (
                <Box
                  component="button"
                  onClick={() => window.location.reload()}
                  sx={{
                    border: 'none',
                    cursor: 'pointer',
                    bgcolor: 'primary.main',
                    color: '#FFFFFF',
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    height: 40,
                    px: 2.25,
                    borderRadius: '2px',
                    '&:hover': { opacity: 0.82 },
                  }}
                >
                  重新检测
                </Box>
              )}
              <Box
                component="button"
                onClick={() => window.history.back()}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  bgcolor: 'transparent',
                  color: 'text.primary',
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  height: 40,
                  px: 2.25,
                  borderRadius: '2px',
                  '&:hover': { borderColor: 'text.primary' },
                }}
              >
                返回
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
