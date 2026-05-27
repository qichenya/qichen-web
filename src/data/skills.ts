export interface Skill {
  id: string;
  name: string;
  category: 'system' | 'vcs' | 'tools';
  proficiency: number;
  icon: string;
}

export const skills: Skill[] = [
  {
    id: '1',
    name: 'Ubuntu',
    category: 'system',
    proficiency: 75,
    icon: 'Terminal',
  },
  {
    id: '2',
    name: 'Debian',
    category: 'system',
    proficiency: 85,
    icon: 'DesktopWindows',
  },
  {
    id: '3',
    name: 'Linuxmint',
    category: 'vcs',
    proficiency: 70,
    icon: 'Hub',
  },
];

export const skillCategories = [
  { id: 'all', label: '全部' },
  { id: 'system', label: '系统' },
  { id: 'vcs', label: '版本控制' },
  { id: 'tools', label: '工具' },
];
