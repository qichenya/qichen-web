export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: '个人博客',
    description: '用 Docker + Nginx 搭建的博客网站，算是我的第一个正经项目，虽然很简单但很有成就感！',
    image: '/images/projects/project1.jpg',
    tags: ['Docker', 'Nginx', 'Linux'],
    githubUrl: 'https://github.com/example/blog',
  },
  {
    id: '2',
    title: 'Shell 脚本工具箱',
    description: '收集整理的一些常用 Shell 脚本，包括服务器巡检、日志清理、自动备份等。',
    image: '/images/projects/project2.jpg',
    tags: ['Shell', 'Linux'],
    githubUrl: 'https://github.com/example/shell-scripts',
  },
  {
    id: '3',
    title: 'Docker 学习笔记',
    description: '学习 Docker 过程中的笔记整理，包含常用命令、镜像构建、网络配置等内容。',
    image: '/images/projects/project3.jpg',
    tags: ['Docker', '笔记'],
    githubUrl: 'https://github.com/example/docker-notes',
  },
  {
    id: '4',
    title: 'Nginx 配置模板',
    description: '常用的 Nginx 配置文件模板，反向代理、负载均衡、HTTPS 配置等。',
    image: '/images/projects/project4.jpg',
    tags: ['Nginx', '配置模板'],
    githubUrl: 'https://github.com/example/nginx-config',
  },
];
