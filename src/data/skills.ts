export interface Skill {
  name: string;
  icon: string;
  category: 'system' | 'vcs' | 'tools';
  proficiency: number;
}

export const skills: Skill[] = [
  {
    name: 'Linux运维',
    icon: 'Terminal',
    category: 'system',
    proficiency: 75,
  },
  {
    name: 'Windows运维',
    icon: 'DesktopWindows',
    category: 'system',
    proficiency: 60,
  },
  {
    name: 'Git',
    icon: 'GitHub',
    category: 'vcs',
    proficiency: 80,
  },
  {
    name: 'OpenClaw',
    icon: 'Code',
    category: 'tools',
    proficiency: 45,
  },
  {
    name: 'GSAP',
    icon: 'Code',
    category: 'tools',
    proficiency: 50,
  },
  {
    name: 'Frp',
    icon: 'Dns',
    category: 'tools',
    proficiency: 70,
  },
];
