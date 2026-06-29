import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
} from '@mui/material';
import { Link as LinkIcon, OpenInNew } from '@mui/icons-material';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { friendLinks } from '../data/friendLinks';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

export const LinksPage: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<LinkIcon />}
            label="Friend Links"
            sx={{
              mb: 3,
              borderRadius: 3,
              backgroundColor: 'secondary.container',
              color: 'secondary.onContainer',
              fontWeight: 500,
            }}
          />
          <Typography
            variant="h2"
            sx={{ mb: 2, fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            友链
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 360, mx: 'auto' }}
          >
            朋友们的网站，欢迎常来逛逛
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <AnimatePresence mode="popLayout">
            {friendLinks.map((link, i) => (
              <motion.div
                key={link.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <Card
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    width: 280,
                    borderRadius: 4,
                    backgroundColor: 'surface.containerLow',
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      backgroundColor: 'surface.container',
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700 }}
                    >
                      {link.name}
                    </Typography>
                    <OpenInNew
                      sx={{
                        fontSize: 18,
                        color: 'text.secondary',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {link.description}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};
