export const quickLinksMarkdown = `
# 七辰的个人博客
https://qichen.icu

# 七辰资源站
https://res.qichen.ink
`;

interface ParsedLink {
  name: string;
  url: string;
}

export const parseQuickLinks = (markdown: string): ParsedLink[] => {
  const lines = markdown.split('\n');
  const links: ParsedLink[] = [];
  let currentName = '';

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('#')) {
      currentName = trimmedLine.substring(1).trim();
    } else if (trimmedLine) {
      try {
        const url = new URL(trimmedLine);
        links.push({
          name: currentName || url.hostname.replace('www.', ''),
          url: trimmedLine,
        });
        currentName = '';
      } catch {
        if (currentName) {
          currentName = '';
        }
      }
    }
  }

  return links;
};
