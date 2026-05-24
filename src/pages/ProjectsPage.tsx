import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import { GitHub, FolderOpen } from '@mui/icons-material';
import { projects } from '../data/projects';

export const ProjectsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <FolderOpen sx={{ color: 'primary.main' }} />
            我的项目
          </Typography>
          <Typography variant="body1" color="onSurfaceVariant">
            学习过程中做的一些小东西，还在不断完善中~ 🛠️
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="body2" color="onSurfaceVariant" sx={{ mb: 2 }}>
            标签筛选：
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="全部"
              onClick={() => setSelectedTag(null)}
              variant={selectedTag === null ? 'filled' : 'outlined'}
              color={selectedTag === null ? 'primary' : 'default'}
            />
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                variant={selectedTag === tag ? 'filled' : 'outlined'}
                color={selectedTag === tag ? 'primary' : 'default'}
                sx={{
                  borderColor: 'outline',
                }}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: 'surface.container',
                  border: 1,
                  borderColor: 'outline',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="onSurfaceVariant"
                  sx={{
                    mb: 2,
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        backgroundColor: 'surface.containerHigh',
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {project.githubUrl && (
                    <Chip
                      icon={<GitHub sx={{ fontSize: 14 }} />}
                      label="查看源码"
                      size="small"
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener"
                      clickable
                      variant="outlined"
                      sx={{
                        borderColor: 'outline',
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {filteredProjects.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              p: 4,
              borderRadius: 3,
              backgroundColor: 'surface.container',
            }}
          >
            <Typography variant="h6" color="onSurfaceVariant">
              暂无相关项目，换个标签试试？
            </Typography>
          </Box>
        )}
      </Container>

      <Box
        sx={{
          py: 8,
          backgroundColor: 'surface.container',
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              🤝 一起学习
            </Typography>
            <Typography
              variant="body1"
              color="onSurfaceVariant"
              sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}
            >
              如果你也在学习运维，或者有什么好的建议，欢迎联系我！
            </Typography>
            <Chip
              label="→ 联系我"
              component="a"
              href="/about"
              clickable
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.onMain',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
