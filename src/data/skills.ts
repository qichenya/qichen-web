export interface Skill {
  name: string;
  icon: string;
  category: 'system' | 'vcs' | 'tools';
  proficiency: number;
}

export const skills: Skill[] = [
  {
    name: 'Ubuntu',
    icon: 'Terminal',
    category: 'system',
    proficiency: 75,
  },
  {
    name: 'Debian',
    icon: 'Terminal',
    category: 'system',
    proficiency: 75,
  },
  {
    name: 'Centos',
    icon: 'Terminal',
    category: 'system',
    proficiency: 70,
  },
  {
    name: 'Windows',
    icon: 'DesktopWindows',
    category: 'system',
    proficiency: 60,
  },
  {
    name: 'Ciallo',
    icon: 'Code',
    category: 'tools',
    proficiency: 50,
  },
  {
    name: 'オナニー',
    icon: 'Code',
    category: 'tools',
    proficiency: 45,
  },
];
