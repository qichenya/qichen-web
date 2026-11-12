import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, CircularProgress, Typography, alpha, useTheme } from '@mui/material';
import { ArrowForward, Block, LinkOff, Reply, RotateRight, WarningAmber } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FONT_DOTS, FONT_MONO, PAGE_MAX_WIDTH } from '../theme/theme';
import { friendLinks } from '../data/friendLinks';
import { extraAllowedLinks } from '../data/linkWhitelist';
import { blockedLinks } from '../data/linkBlacklist';
import { checkLink, type LinkFailure } from '../utils/linkCheck';

const MAX_RETRY = 3;

// 白名单按 协议 + 域名 + 路径 精确匹配，避免本站成为任意跳转/探测的中转
const toWhitelistKey = (raw: string): string | null => {
  try {
    const url = new URL(raw);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    const path = url.pathname.replace(/\/+$/, '');
    return `${url.protocol}//${url.host}${path}`.toLowerCase();
  } catch {
    return null;
  }
};

// 黑名单按域名匹配，写完整 URL 或裸域名都能识别
const toHostname = (raw: string): string | null => {
  try {
    const url = new URL(raw.includes('://') ? raw : `https://${raw}`);
    return url.hostname.toLowerCase();
  } catch {
    return null;
  }
};

type Phase = 'checking' | 'failed' | 'denied' | 'unlisted';

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
  const navigate = useNavigate();

  const whitelist = useMemo(
    () => new Set(
      [...friendLinks.map((link) => link.url), ...extraAllowedLinks]
        .map(toWhitelistKey)
        .filter((key): key is string => Boolean(key)),
    ),
    [],
  );
  const blacklist = useMemo(
    () => new Set(
      blockedLinks
        .map(toHostname)
        .filter((host): host is string => Boolean(host)),
    ),
    [],
  );
  const targetKey = toWhitelistKey(target);
  const targetHost = targetKey ? new URL(target).hostname.toLowerCase() : null;
  const blacklisted = Boolean(targetHost && blacklist.has(targetHost));
  const allowed = Boolean(targetKey && !blacklisted && whitelist.has(targetKey));

  const [phase, setPhase] = useState<Phase>(allowed ? 'checking' : blacklisted ? 'denied' : 'unlisted');
  const [failure, setFailure] = useState<LinkFailure | null>(null);
  const [attempts, setAttempts] = useState(0);
  const runningRef = useRef(false);

  const run = useCallback(async () => {
    if (!allowed || runningRef.current) return;
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
  }, [allowed, target]);

  useEffect(() => {
    if (!allowed) {
      setPhase(blacklisted ? 'denied' : 'unlisted');
      return;
    }
    void run();
  }, [allowed, blacklisted, run]);

  const retry = () => {
    if (attempts >= MAX_RETRY) return;
    setAttempts((prev) => prev + 1);
    void run();
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.close();
  };

  // 既不在白名单也不在黑名单时，允许访问者手动前往
  const goAnyway = () => {
    if (!targetKey) return;
    window.opener = null;
    window.location.replace(target);
  };

  const denied = phase === 'denied';
  const unlisted = phase === 'unlisted';
  const checking = phase === 'checking';
  const failureState = failure ?? {
    code: 'ERR_CONNECTION_FAILED',
    subtitle: '无法建立到目标站点的连接。',
    description: '可能是域名解析失败、证书过期，或对方服务器拒绝了这次连接。',
    dns: '未找到可用记录',
  };
  const retryExhausted = attempts >= MAX_RETRY;
  const primaryDisabled = unlisted ? !targetKey : !denied && (checking || retryExhausted);

  const metaRight = denied ? 'BLOCKED' : unlisted ? 'UNLISTED' : checking ? 'CHECKING' : 'CHECK FAILED';
  const cardTitle = denied
    ? '该地址已被列入黑名单'
    : unlisted
      ? '链接不在白名单内'
      : checking
        ? '正在检查链接'
        : '无法跳转到该链接';
  const cardSubtitle = denied
    ? '目标站点在黑名单中，已阻止跳转。'
    : unlisted
      ? '该地址既不在白名单，也不在黑名单中。'
      : checking
        ? '请稍候，正在确认目标站点是否可以访问。'
        : failureState.subtitle;
  const cardDescription = denied
    ? '该地址被明确列入黑名单，本站不会为其提供跳转。'
    : unlisted
      ? '你可以手动继续前往，但请先自行确认目标站点的可信度，风险由访问者承担。'
      : checking
        ? '检查通过后会自动跳转；若目标站点没有响应，就会停留在当前页面。'
        : failureState.description;

  const diagnosticsRows = denied
    ? [
        { key: 'STATUS', value: 'ERR_BLACKLISTED', accent: true },
        { key: 'DNS', value: '不适用', accent: false },
        { key: 'ALLOW', value: '已拉黑', accent: false },
      ]
    : unlisted
      ? [
          { key: 'STATUS', value: 'ERR_NOT_WHITELISTED', accent: true },
          { key: 'DNS', value: '不适用', accent: false },
          { key: 'ALLOW', value: '需手动确认', accent: false },
        ]
      : [
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
              {metaRight}
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
              ) : denied ? (
                <Block sx={{ fontSize: 24, color: 'primary.main' }} />
              ) : unlisted ? (
                <WarningAmber sx={{ fontSize: 24, color: 'primary.main' }} />
              ) : (
                <LinkOff sx={{ fontSize: 24, color: 'primary.main' }} />
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 500, letterSpacing: '0.4px', lineHeight: '28px' }}>
                {cardTitle}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: '20px' }}>
                {cardSubtitle}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: 20 }} />

          <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: '25px' }}>
            {cardDescription}
          </Typography>

          <Box sx={{ height: 22 }} />

          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '2px', overflow: 'hidden' }}>
            <Box sx={{ p: '12px 14px', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box component="span" sx={{ ...mono(10, '1.5px'), color: 'text.disabled', whiteSpace: 'nowrap' }}>
                  TARGET
                </Box>
                <Box component="span" sx={{ ...mono(10, '1.5px'), color: checking ? 'text.secondary' : 'primary.main', whiteSpace: 'nowrap' }}>
                  {denied ? 'BLOCKED' : unlisted ? 'UNLISTED' : checking ? 'CHECKING' : 'FAILED'}
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
              onClick={denied ? () => navigate('/links') : unlisted ? goAnyway : retry}
              disabled={primaryDisabled}
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
                cursor: primaryDisabled ? 'not-allowed' : 'pointer',
                bgcolor: 'primary.main',
                color: '#FFFFFF',
                ...mono(14, '0.2px'),
                opacity: primaryDisabled ? 0.45 : 1,
                transition: 'opacity .2s ease',
                '&:hover': { opacity: primaryDisabled ? 0.45 : 0.82 },
              }}
            >
              {denied || unlisted ? <ArrowForward sx={{ fontSize: 15 }} /> : <RotateRight sx={{ fontSize: 15 }} />}
              {denied ? '去友链页' : unlisted ? '仍然前往' : retryExhausted ? '重试次数已用完' : '重试一次'}
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
              {denied
                ? '该地址已被列入黑名单，本站不会为其提供跳转。'
                : unlisted
                  ? '继续前往前请自行确认该站点可信，风险由访问者承担。'
                  : '如果问题持续存在，请联系站点管理员检查解析与证书。'}
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
