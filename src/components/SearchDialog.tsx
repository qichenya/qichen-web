import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { quickLinksMarkdown, parseQuickLinks } from '../data/quickLinks';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  open,
  onClose,
}) => {
  const links = parseQuickLinks(quickLinksMarkdown);

  const handleLinkClick = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>快捷链接</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          点击下方链接快速访问常用网站
        </Typography>
        {links.length === 0 ? (
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ textAlign: 'center', py: 4 }}
          >
            貌似没有可以快速跳转的直链QWQ
          </Typography>
        ) : (
          <List>
            {links.map((link) => (
              <ListItemButton
                key={link.url}
                onClick={() => handleLinkClick(link.url)}
              >
                <ListItemText primary={link.name} secondary={link.url} />
              </ListItemButton>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};
