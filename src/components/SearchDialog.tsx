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
} from '@mui/material';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectEngine: (engine: string) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  open,
  onClose,
  onSelectEngine,
}) => {
  const searchEngines = [
    { name: 'Google', value: 'google' },
    { name: 'Bing', value: 'bing' },
    { name: 'Baidu', value: 'baidu' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>选择搜索引擎</DialogTitle>

      <DialogContent>
        <List>
          {searchEngines.map((engine) => (
            <ListItemButton
              key={engine.value}
              onClick={() => onSelectEngine(engine.value)}
            >
              <ListItemText primary={engine.name} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>取消</Button>
      </DialogActions>
    </Dialog>
  );
};
