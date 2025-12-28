'use client';
import { useBooks, useCreateBook } from '@/hooks/useBooks';
import { Box, Typography, List, ListItem, ListItemText, ListItemButton, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: books, isLoading } = useBooks();
  const createBook = useCreateBook();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const router = useRouter();

  const handleCreateBook = async () => {
    if (newBookName.trim()) {
      await createBook.mutateAsync({ book_name: newBookName });
      setNewBookName('');
      setIsDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Account Books
      </Typography>
      
      {books?.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No account books found. Create one to get started.
          </Typography>
      ) : (
        <List>
          {books?.map((book) => (
            <ListItem key={book.id} disablePadding>
              <ListItemButton onClick={() => router.push(`/${book.id}`)}>
                <ListItemText 
                  primary={book.book_name} 
                  secondary={`Created: ${new Date(book.created_at || '').toLocaleDateString()}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>New Account Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Book Name"
            type="text"
            fullWidth
            variant="standard"
            value={newBookName}
            onChange={(e) => setNewBookName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateBook} disabled={createBook.isPending}>
            {createBook.isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
