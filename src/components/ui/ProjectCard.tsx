import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import { GitHub, OpenInNew } from '@mui/icons-material';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 18px 40px rgba(34, 35, 57, 0.15)',
          borderColor: 'primary.main',
          '& .project-preview': { transform: 'translate(-50%, -50%) scale(1.08)' },
        },
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: featured ? '50%' : '56.25%',
          position: 'relative',
          backgroundColor: 'surface.containerHigh',
          backgroundImage: `linear-gradient(135deg, #6750A4 0%, #9C89B8 50%, #E0AAFF 100%)`,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-70%',
            background: 'linear-gradient(110deg, transparent 42%, rgba(255,255,255,0.32) 50%, transparent 58%)',
            transform: 'translateX(-55%) rotate(8deg)',
            transition: 'transform 0.7s ease',
          },
          '&:hover::before': { transform: 'translateX(55%) rotate(8deg)' },
        }}
      >
        <Box
          className="project-preview"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 700,
              textAlign: 'center',
              px: 2,
            }}
          >
            {project.title}
          </Typography>
        </Box>
      </CardMedia>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          color="onSurfaceVariant"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {project.tags.slice(0, 4).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'outline',
                '& .MuiChip-label': { px: 1 },
              }}
            />
          ))}
          {project.tags.length > 4 && (
            <Chip
              label={`+${project.tags.length - 4}`}
              size="small"
              sx={{
                backgroundColor: 'surface.containerHigh',
              }}
            />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
        {project.demoUrl && (
          <Button
            variant="contained"
            size="small"
            startIcon={<OpenInNew />}
            href={project.demoUrl}
            target="_blank"
            rel="noopener"
          >
            在线演示
          </Button>
        )}
        {project.githubUrl && (
          <IconButton
            component="a"
            href={project.githubUrl}
            target="_blank"
            rel="noopener"
            sx={{
              color: 'onSurfaceVariant',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <GitHub />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
