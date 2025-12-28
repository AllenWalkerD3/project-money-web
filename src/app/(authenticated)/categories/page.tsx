'use client';
import { useCategories } from '@/hooks/useCategories';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, ListItemIcon } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Categories</Typography>
      <List>
          {categories?.map(cat => (
              <ListItem key={cat.id}>
                  <ListItemIcon><LabelIcon /></ListItemIcon>
                  <ListItemText primary={cat.name} secondary={cat.type} />
              </ListItem>
          ))}
      </List>
    </Box>
  );
}
