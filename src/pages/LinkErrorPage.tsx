import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography, alpha, useTheme } from '@mui/material';
import { LinkOff, Reply, RotateRight } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';
import { checkLink, type LinkFailure } from '../utils/linkCheck';

const MAX_RETRY = 3;

const mono = (size: number, spacing = '0.02em') => ({
  fontFamily: FONT_MONO,
  fontSize: size,
  letterSpacing: spacing,
  lineHeight: 'normal',
});

export const LinkErrorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const target = searchParams.get('target') ?? '';
  const theme = useTheme();

  const [phase, setPhase] = useState<'checking' | 'failed'>('checking');
  const [failure, setFailure] = useState<LinkFailure | null>(null);
  const [attempts, setAttempts] = useState(0);
  const runningRef = useRef(false);

  const run = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setPhase('checking');

    const result = await checkLink(target);
    runningRef.current = false;

    if (result.ok) {
      window.opener = null;
      window.location.replace(target);
      return;
    }

    setFailure(result.failure);
    setPhase('failed');
  }, [target]);

  useEffect(() => {
    void run();
  }, [run]);

  const retry = () => {
    if (attempts >= MAX_RETRY) return;
    setAttempts((prev) => prev + 1);
    void run();
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.close();
  };

  const checking = phase === 'checking';
  const failureState = failure ?? {
    code: 'ERR_CONNECTION_FAILED',
    subtitle: '无法建立到目标站点的连接。',
    description: '可能是域名解析失败、证书过期，或对方服务器拒绝了这次连接。',
    dns: '未找到可用记录',
  };
  const retryExhausted = attempts >= MAX_RETRY;

  const diagnosticsRows = [
    { key: 'STATUS', value: checking ? 'PENDING' : failureState.code, accent: !checking },
    { key: 'DNS', value: checking ? '检测中' : failureState.dns, accent: false },
    { key: 'RETRY', value: `${attempts} / ${MAX_RETRY}`, accent: false },
  ];

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
                ERROR / LINK
              </Box>
            </Box>
            <Box component="span" sx={{ ...mono(10.5, '1.2px'), color: 'text.secondary', whiteSpace: 'nowrap' }}>
              {checking ? 'CHECKING' : 'CHECK FAILED'}
            </Box>
          </Box>

          <Box sx={{ height: 22 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 58,
                height: 58,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '2px',
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.28),
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }}
            >
              {checking ? (
                <CircularProgress size={22} thickness={4} sx={{ color: 'primary.main' }} />
              ) : (
                <LinkOff sx={{ fontSize: 24, color: 'primary.main' }} />
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 500, letterSpacing: '0.4px', lineHeight: '28px' }}>
                {checking ? '正在检查链接' : '无法跳转到该链接'}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: '20px' }}>
                {checking ? '请稍候，正在确认目标站点是否可以访问。' : failureState.subtitle}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: 20 }} />

          <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: '25px' }}>
            {checking
              ? '检查通过后会自动跳转；若目标站点没有响应，就会停留在当前页面。'
              : failureState.description}
          </Typography>

          <Box sx={{ height: 22 }} />

          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '2px', overflow: 'hidden' }}>
            <Box sx={{ p: '12px 14px', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box component="span" sx={{ ...mono(10, '1.5px'), color: 'text.disabled', whiteSpace: 'nowrap' }}>
                  TARGET
                </Box>
                <Box component="span" sx={{ ...mono(10, '1.5px'), color: checking ? 'text.secondary' : 'primary.main', whiteSpace: 'nowrap' }}>
                  {checking ? 'CHECKING' : 'FAILED'}
                </Box>
              </Box>
              <Box
                component="span"
                sx={{ ...mono(13, '0.2px'), color: 'text.primary', wordBreak: 'break-all' }}
              >
                {target || '未提供目标地址'}
              </Box>
            </Box>

            {diagnosticsRows.map((row) => (
              <Box
                key={row.key}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  p: '10px 14px',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box component="span" sx={{ ...mono(9.5, '1.3px'), color: 'text.disabled', whiteSpace: 'nowrap' }}>
                  {row.key}
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontFamily: row.key === 'DNS' ? 'inherit' : FONT_MONO,
                    fontSize: row.key === 'DNS' ? 12 : 11,
                    letterSpacing: '0.2px',
                    lineHeight: 'normal',
                    color: row.accent ? 'primary.main' : 'text.secondary',
                    textAlign: 'right',
                    wordBreak: 'break-all',
                  }}
                >
                  {row.value}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ height: 20 }} />

          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box
              component="button"
              type="button"
              onClick={retry}
              disabled={checking || retryExhausted}
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
                cursor: checking || retryExhausted ? 'not-allowed' : 'pointer',
                bgcolor: 'primary.main',
                color: '#FFFFFF',
                ...mono(14, '0.2px'),
                opacity: checking || retryExhausted ? 0.45 : 1,
                transition: 'opacity .2s ease',
                '&:hover': { opacity: checking || retryExhausted ? 0.45 : 0.82 },
              }}
            >
              <RotateRight sx={{ fontSize: 15 }} />
              {retryExhausted ? '重试次数已用完' : '重试一次'}
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
              返回上一页
              <Reply sx={{ fontSize: 15, transform: 'scaleX(-1)' }} />
            </Box>
          </Box>

          <Box sx={{ height: 18 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ width: 7.071, height: 7.071, position: 'relative', flexShrink: 0 }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 3.536,
                  left: 0,
                  width: 5,
                  height: 5,
                  bgcolor: 'divider',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'top left',
                }}
              />
            </Box>
            <Typography sx={{ fontSize: 11, color: 'text.secondary', lineHeight: '19px' }}>
              如果问题持续存在，请联系站点管理员检查解析与证书。
            </Typography>
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
