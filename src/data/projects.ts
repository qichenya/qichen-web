export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: '个人博客',
    description: '使用 React + Vite 构建的静态个人主页，支持响应式设计和主题切换。',
    tags: ['React', 'Vite', 'TypeScript', 'Material UI'],
    githubUrl: 'https://github.com/qichenya',
  },
];
