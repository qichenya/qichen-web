import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ArrowOutward, Link as LinkIcon } from '@mui/icons-material';
import { parseQuickLinks, quickLinksMarkdown } from '../data/quickLinks';

interface SearchDialogProps { open: boolean; onClose: () => void; }

export const SearchDialog: React.FC<SearchDialogProps> = ({ open, onClose }) => {
  const links = parseQuickLinks(quickLinksMarkdown);
  return <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ pb: 1, fontWeight: 800 }}>快捷链接</DialogTitle>
    <DialogContent><Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>常用站点与个人空间。</Typography>
      <List disablePadding sx={{ display: 'grid', gap: 1 }}>
        {links.map((link) => <ListItemButton key={link.url} component="a" href={link.url} target="_blank" rel="noreferrer" onClick={onClose} sx={{ borderRadius: 3, bgcolor: 'primary.container', color: 'primary.onContainer', py: 1.25 }}><Box sx={{ mr: 1.5, color: 'primary.main' }}><LinkIcon /></Box><ListItemText primary={link.name} secondary={link.url} primaryTypographyProps={{ fontWeight: 700 }} /><ArrowOutward /></ListItemButton>)}
      </List>
    </DialogContent>
    <DialogActions sx={{ p: 2.5, pt: 1 }}><Button onClick={onClose}>关闭</Button></DialogActions>
  </Dialog>;
};
