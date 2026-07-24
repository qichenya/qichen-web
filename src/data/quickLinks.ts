export interface QuickLink {
  name: string;
  url: string;
}

export const quickLinksMarkdown = `
# 快捷链接

- [GitHub](https://github.com/qichenya)
- [Telegram](https://t.me/qichen_sama)
`;

export function parseQuickLinks(markdown: string): QuickLink[] {
  const links: QuickLink[] = [];
  const regex = /-\s*\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    links.push({ name: match[1], url: match[2] });
  }
  return links;
}
