import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  LocationOn,
} from '@mui/icons-material';
import { personalInfo } from '../data/personalInfo';

// 自定义头像组件，处理加载失败
const CustomAvatar: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return null;
  }

  return (
    <Avatar
      src={personalInfo.avatar}
      alt={personalInfo.name}
      onError={() => setImageError(true)}
      sx={{
        width: 120,
        height: 120,
        mx: 'auto',
        mb: 3,
        fontSize: '2.5rem',
        fontWeight: 700,
        backgroundColor: 'primary.main',
        boxShadow: '0 4px 20px rgba(61, 139, 139, 0.25)',
      }}
    >
      {personalInfo.name[0]}
    </Avatar>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <CustomAvatar />

          <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
            {personalInfo.name}
          </Typography>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            {personalInfo.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4 }}>
            <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {personalInfo.location}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            关于我
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 2, whiteSpace: 'pre-line' }}
          >
            {personalInfo.bio}
          </Typography>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            在学的东西
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {personalInfo.interests.map((interest) => (
              <Box
                key={interest}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: 'primary.container',
                  color: 'primary.onContainer',
                }}
              >
                {interest}
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            联系我
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            <Typography variant="body1" color="text.primary">
              邮箱: <Box component="a" href={`mailto:${personalInfo.email}`} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                {personalInfo.email}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.primary">
              QQ: {personalInfo.qq}
            </Typography>
            <Typography variant="body1" color="text.primary">
              GitHub: <Box component="a" href={personalInfo.github} target="_blank" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                {personalInfo.github}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.primary">
              Telegram: <Box component="a" href={personalInfo.telegram} target="_blank" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                {personalInfo.telegram}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
