export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  description: string;
  date: string;
  type: 'education' | 'work' | 'milestone';
}

export const timelineItems: TimelineItem[] = [
  {
    id: '1',
    title: '开始学习运维',
    organization: '自学之路',
    description: '决定转行学习运维，开始学习 Linux 基础和 Shell 脚本。每天进步一点点~',
    date: '2024',
    type: 'milestone',
  },
  {
    id: '2',
    title: '学习 Linux',
    organization: '在线课程',
    description: '从零开始学习 Linux 常用命令、用户权限、文件系统等基础知识。',
    date: '2024',
    type: 'education',
  },
  {
    id: '3',
    title: '学习 Docker',
    organization: '技术文档',
    description: '学习容器技术，理解镜像、容器、网络等概念，搭建了自己的第一个容器环境。',
    date: '2024',
    type: 'milestone',
  },
  {
    id: '4',
    title: '学习 Nginx',
    organization: '实战练习',
    description: '配置反向代理、负载均衡、SSL证书等，虽然踩了不少坑，但收获很大。',
    date: '2024',
    type: 'milestone',
  },
  {
    id: '5',
    title: '搭建博客',
    organization: '个人项目',
    description: '用 Nginx + Docker 搭建了这个个人博客，算是第一个正经的项目~',
    date: '2024',
    type: 'work',
  },
];
