export interface LinkFailure {
  code: string;
  subtitle: string;
  description: string;
  dns: string;
}

export type LinkCheckResult = { ok: true } | { ok: false; failure: LinkFailure };

const INVALID_TARGET: LinkFailure = {
  code: 'ERR_INVALID_URL',
  subtitle: '目标地址不是有效的网页链接。',
  description: '链接格式无法解析，或使用的协议不是 HTTP / HTTPS。请返回上一页重新选择一个友链。',
  dns: '不适用',
};

const TIMED_OUT: LinkFailure = {
  code: 'ERR_TIMED_OUT',
  subtitle: '连接在响应之前就中断了。',
  description: '目标站点在超时时间内没有给出响应。可能是网络受限、服务器过载，或对方主动丢弃了这次连接。',
  dns: '解析成功，但无响应',
};

const CONNECTION_FAILED: LinkFailure = {
  code: 'ERR_CONNECTION_FAILED',
  subtitle: '无法建立到目标站点的连接。',
  description: '可能是域名解析失败、证书过期，或对方服务器拒绝了这次连接。',
  dns: '未找到可用记录',
};

const toHttpUrl = (raw: string): URL | null => {
  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
};

/** 用 no-cors 请求探测目标站点是否可连通：能拿到响应即视为在线。 */
export const checkLink = (rawUrl: string, timeout = 6000): Promise<LinkCheckResult> => {
  const target = toHttpUrl(rawUrl);
  if (!target) return Promise.resolve({ ok: false, failure: INVALID_TARGET });

  return new Promise((resolve) => {
    const controller = new AbortController();
    let settled = false;

    const finish = (result: LinkCheckResult) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(result);
    };

    const timer = window.setTimeout(() => {
      controller.abort();
      finish({ ok: false, failure: TIMED_OUT });
    }, timeout);

    fetch(target.toString(), { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
      .then(() => finish({ ok: true }))
      .catch(() => finish({ ok: false, failure: CONNECTION_FAILED }));
  });
};
