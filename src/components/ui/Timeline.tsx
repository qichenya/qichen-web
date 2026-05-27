import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { School, Work, Star } from '@mui/icons-material';
import type { TimelineItem } from '../../data/timeline';

interface TimelineProps {
  items: TimelineItem[];
}

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'education':
      return <School sx={{ fontSize: 18 }} />;
    case 'work':
      return <Work sx={{ fontSize: 18 }} />;
    case 'milestone':
      return <Star sx={{ fontSize: 18 }} />;
    default:
      return <Work sx={{ fontSize: 18 }} />;
  }
};

const getIconBgColor = (type: TimelineItem['type'], theme: any) => {
  switch (type) {
    case 'education':
      return theme.palette.primary.main;
    case 'work':
      return theme.palette.secondary.main;
    case 'milestone':
      return theme.palette.tertiary.main;
    default:
      return theme.palette.primary.main;
  }
};

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const theme = useTheme();

  return (
    <Box>
      {items.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            gap: 3,
            mb: 4,
            '&:last-child': { mb: 0 },
            position: 'relative',
            pl: 5,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 15,
              top: 24,
              bottom: index === items.length - 1 ? 'auto' : -24,
              width: 2,
              backgroundColor: 'divider',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 4,
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: getIconBgColor(item.type, theme),
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2,
              zIndex: 1,
            }}
          >
            {getIcon(item.type)}
          </Box>

          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 0.5 }}
            >
              {item.date}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
              {item.title}
            </Typography>
            <Typography
              variant="caption"
              color="primary.main"
              sx={{ display: 'block', mb: 1 }}
            >
              {item.organization}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {item.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
