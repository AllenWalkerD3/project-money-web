'use client';
import { useTransactions, useCreateTransaction } from '@/hooks/useTransactions';
import { useCategories } from '@/hooks/useCategories';
import { Box, Typography, List, ListItem, ListItemText, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, CircularProgress, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, use } from 'react';
import { CreateTransactionDTO } from '@/types';
import { useAccountType } from '@/hooks/useAccountType';

export default function BookTransactionsPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = use(params);
  const bookId = parseInt(resolvedParams.bookId);
  const { data: transactions, isLoading } = useTransactions(bookId);
  const { data: categories } = useCategories();
  const { data: accountType } = useAccountType(1); // TODO: Get user_id from auth
  const createTransaction = useCreateTransaction();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateTransactionDTO>>({
      transaction_type: 'expense',
      amount: undefined,
      remark: '',
      category_id: undefined
  });

  const resetForm = () => {
      setFormData({
          transaction_type: 'expense',
          amount: undefined,
          remark: '',
          category_id: undefined
      });
  };


  const handleCreate = async () => {
      if (formData.amount && formData.category_id && formData.transaction_type && bookId) {
          await createTransaction.mutateAsync({
              ...formData,
              book_id: bookId,
              account_id: bookId, // Assuming account_id is book_id for now
              amount: Number(formData.amount),
              category_id: Number(formData.category_id),
              remark: formData.remark || '',
              transaction_type: formData.transaction_type as 'income' | 'expense',
              description: categories?.find(cat => cat.id === formData.category_id)?.name || '',
              currency: 'ZAR', // TODO: Get currency from user settings
              account_type_id: accountType?.find(at => at.id === 3)?.id, // TODO: Get account type from user settings (Credit card)\
              transaction_category_id: formData.category_id,
          } as CreateTransactionDTO);
          setIsDialogOpen(false);
          setFormData({ transaction_type: 'expense', amount: 0, remark: '', category_id: undefined });
      }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Transactions</Typography>
      
      <List>
          {transactions?.map(tx => (
              <ListItem key={tx.id} divider>
                  <ListItemText 
                      primary={`${tx.description} - ${tx.remark || 'No remark'} - ${tx.transaction_type === 'income' ? '+' : '-'}${tx.amount}`}
                      secondary={new Date(tx.datetime).toLocaleDateString()}
                  />
              </ListItem>
          ))}
      </List>

      <Fab sx={{ position: 'fixed', bottom: 16, right: 16 }} color="primary" onClick={() => setIsDialogOpen(true)}>
          <AddIcon />
      </Fab>
      
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 !, pb: 2 }}>
              <TextField 
                  label="Amount" 
                  type="number" 
                  required
                  error={formData.amount === 0}
                  helperText={formData.amount === 0 ? 'Amount cannot be 0' : ''}
                  InputProps={{
                      startAdornment: <InputAdornment position="start">ZAR</InputAdornment>,
                  }}
                  size="small"
                  fullWidth 
                  value={formData.amount} 
                  onChange={e => setFormData({...formData, amount: Number(e.target.value)})} 
              />
               <TextField 
                  label="Remark" 
                  size="small"
                  fullWidth 
                  value={formData.remark} 
                  onChange={e => setFormData({...formData, remark: e.target.value})} 
              />
              <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select 
                      value={formData.transaction_type} 
                      label="Type"
                      onChange={e => setFormData({...formData, transaction_type: e.target.value as 'income' | 'expense'})}
                  >
                      <MenuItem value="expense">Expense</MenuItem>
                      <MenuItem value="income">Income</MenuItem>
                  </Select>
              </FormControl>
              <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select 
                      value={formData.category_id || ''} 
                      size="small"
                      label="Category"
                      onChange={e => setFormData({...formData, category_id: Number(e.target.value)})}
                  >
                      {categories?.map(cat => (
                          <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
              <FormControl fullWidth>
                  <InputLabel>Account Type</InputLabel>
                  <Select 
                      value={formData.account_type_id || ''} 
                      size="small"
                      label="Account Type"
                      onChange={e => setFormData({...formData, account_type_id: Number(e.target.value)})}
                  >
                      {accountType?.map(at => (
                          <MenuItem key={at.id} value={at.id}>{at.name}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </DialogContent>
          <DialogActions>
              <Button onClick={() => {setIsDialogOpen(false); resetForm()}}>Cancel</Button>
              <Button onClick={handleCreate} variant="contained">Save</Button>
          </DialogActions>
      </Dialog>
    </Box>
  );
}
