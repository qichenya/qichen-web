export interface TimelineItem {
  id: string;
  type: 'education' | 'work' | 'milestone';
  date: string;
  title: string;
  organization: string;
  description: string;
}

export const timelineItems: TimelineItem[] = [
  {
    id: '1',
    type: 'milestone',
    date: '2024',
    title: '开始学习运维',
    organization: '自学',
    description: '开始系统学习 Linux 运维、Docker 容器化和自动化运维工具。',
  },
];
