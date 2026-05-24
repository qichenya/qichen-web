import React from 'react';
import { Card, CardContent, Box, Typography, LinearProgress, Chip } from '@mui/material';
import {
  Code,
  Hub,
  GitHub,
  Terminal,
  Dns,
  DesktopWindows,
} from '@mui/icons-material';
import type { Skill } from '../../data/skills';

interface SkillCardProps {
  skill: Skill;
}

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal sx={{ fontSize: 32 }} />,
  Hub: <Hub sx={{ fontSize: 32 }} />,
  GitHub: <GitHub sx={{ fontSize: 32 }} />,
  Code: <Code sx={{ fontSize: 32 }} />,
  Dns: <Dns sx={{ fontSize: 32 }} />,
  DesktopWindows: <DesktopWindows sx={{ fontSize: 32 }} />,
};

const categoryColors: Record<string, string> = {
  system: '#3D8B8B',
  vcs: '#6B8E7A',
  tools: '#A88B6F',
};

const categoryLabels: Record<string, string> = {
  system: '系统',
  vcs: '版本控制',
  tools: '工具',
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        backgroundColor: 'surface.main',
        borderColor: 'outline.light',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.container',
              color: 'primary.main',
            }}
          >
            {iconMap[skill.icon] || <Code sx={{ fontSize: 32 }} />}
          </Box>

          <Typography variant="h6" fontWeight={600} color="text.primary">
            {skill.name}
          </Typography>

          <Chip
            label={categoryLabels[skill.category] || '其他'}
            size="small"
            sx={{
              backgroundColor: categoryColors[skill.category] + '15',
              color: categoryColors[skill.category],
              fontWeight: 500,
            }}
          />

          <Box sx={{ width: '100%', mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                熟练度
              </Typography>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                {skill.proficiency}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={skill.proficiency}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'surface.variant',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  backgroundColor: 'primary.main',
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
