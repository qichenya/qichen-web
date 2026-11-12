/**
 * 友链跳转黑名单（外置，方便单独维护）
 *
 * - 按域名匹配，写域名或完整 URL 都可以，例如 `spam.com` / `https://spam.com/path`
 * - 黑名单优先级高于白名单：即使同时在白名单里也会被拦截
 */
export const blockedLinks: string[] = [
  'pornhub.com',
];
