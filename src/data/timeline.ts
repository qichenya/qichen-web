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
    date: '2022年末',
    title: '开始学习运维',
    organization: '自学',
    description: '开始系统学习 Windows Server 运维',
  },
  {
    id: '2',
    type: 'milestone',
    date: '2023上半年',
    title: '完成qichen-web第一版的搭建',
    organization: '自学',
    description: '开始主写html和css',
  },
  {
    id: '3',
    type: 'milestone',
    date: '2023下半年',
    title: '开始学习安装Ubuntu,Debian主流linux',
    organization: '自学',
    description: '但当时并没有像那么多所以windows把gurb炸了',
  },
  {
    id: '4',
    type: 'milestone',
    date: '2023下半年',
    title: '首次手动安装ArchLinux但是失败了',
    organization: '自学',
    description: '然后进入了一段低谷期',
  },
  {
    id: '5',
    type: 'milestone',
    date: '2024下半年',
    title: '完成了qichen-web的第二版',
    organization: '带领',
    description: '完成第二版设计后和带我的那个吵了一下',
  },
  {
    id: '6',
    type: 'milestone',
    date: '2025上半年',
    title: '第二次安装了ArchLinux且成功了',
    organization: '自学',
    description: '好像并不是很难()',
  },
  {
    id: '7',
    type: 'milestone',
    date: '2025上半年',
    title: '开始接触Cloudflare Worker',
    organization: '自学',
    description: '免费的超爽！',
  },
  {
    id: '8',
    type: 'milestone',
    date: '2025下半年',
    title: '开始接触R2和堡垒机相关',
    organization: '自学',
    description: '好难~',
  },
  {
    id: '9',
    type: 'milestone',
    date: '2026年初',
    title: '完成了qichen-web第三版的搭建',
    organization: '自学',
    description: 'md3真好看欸嘿嘿~',
  },
  {
    id: '9',
    type: 'milestone',
    date: '现在',
    title: '正在学习网络架构以及ISCSI实际使用',
    organization: '自学',
    description: 'Microsoft Fuck you!',
  },
];
