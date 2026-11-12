/**
 * 友链跳转白名单（外置，方便单独维护）
 *
 * - `src/data/friendLinks.ts` 中的地址会自动加入白名单，无需在这里重复
 * - 这里用于额外允许跳转的地址，只写完整的 http / https URL
 * - 末尾斜杠可有可无，比较时会忽略
 */
export const extraAllowedLinks: string[] = [
  'https://qichen.ink',
  'https://qichen.icu',
];
