export interface Skill {
  name: string;
  icon: string;
  category: 'system' | 'vcs' | 'tools';
  proficiency: number;
}

export const skills: Skill[] = [
  {
    name: 'Linux',
    icon: 'Terminal',
    category: 'system',
    proficiency: 75,
  },
  {
    name: 'Docker',
    icon: 'Dns',
    category: 'tools',
    proficiency: 60,
  },
  {
    name: 'Git',
    icon: 'GitHub',
    category: 'vcs',
    proficiency: 70,
  },
];
