export interface Skill {
  name: string;
  icon: string;
  category: 'system' | 'vcs' | 'tools';
  proficiency: number;
}

export const skills: Skill[] = [
  {
    name: 'Linux运维',
  },
  {
    name: 'Windows运维',
  },
  {
    name: 'Git的使用',
  },
  {
    name: 'Openclaw的使用',
  },
  {
    name: 'skill的使用',
  },
  {
    name: 'Frp的使用',
  },
];
