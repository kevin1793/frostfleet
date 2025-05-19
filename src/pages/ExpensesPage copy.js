// src/pages/Expenses.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Typography,
  CircularProgress,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { styled } from '@mui/material/styles';
import ExpenseList from '../components/ExpenseList'

const PAGE_SIZE = 10;

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(2),
}));

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Default to today
  });
  const [editingExpense, setEditingExpense] = useState(null); // For editing
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // For confirmation modal
  const [expenseToDelete, setExpenseToDelete] = useState(null); // Expense to be deleted

  const expensesRef = collection(db, 'expenses');

  // Fetch expenses
  const fetchExpenses = async (direction = 'next', doc = null) => {
    setLoading(true);
    try {
      let q;
      if (direction === 'next' && doc) {
        q = query(
          expensesRef,
          orderBy('date', 'desc'),
          startAfter(doc),
          limit(PAGE_SIZE)
        );
      } else {
        q = query(
          expensesRef,
          orderBy('date', 'desc'),
          limit(PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(q);
      const newExpenses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setExpenses(newExpenses);
      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setFirstDoc(querySnapshot.docs[0]);
        setHasMore(querySnapshot.docs.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleNext = () => {
    if (hasMore && lastDoc) {
      fetchExpenses('next', lastDoc);
    }
  };

  const handlePrevious = () => {
    if (firstDoc) {
      fetchExpenses();
    }
  };

  const handleOpenModal = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setNewExpense({
        title: expense.title,
        amount: expense.amount,
        date: expense.date.split('T')[0], // Format the date correctly for the input
      });
    } else {
      setEditingExpense(null);
      setNewExpense({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Default to today
      });
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingExpense(null);
    setNewExpense({
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0], // Reset state
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditExpense = async () => {
    if (!editingExpense) return;

    try {
      const expenseRef = doc(db, 'expenses', editingExpense.id);
      await updateDoc(expenseRef, {
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        date: new Date(newExpense.date).toISOString(),
        updatedAt: serverTimestamp(), // Optionally add a timestamp for updates
      });

      handleCloseModal(); // Close modal after edit
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleAddExpense = async () => {
    try {
      await addDoc(expensesRef, {
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        date: new Date(newExpense.date).toISOString(),
        createdAt: serverTimestamp(),
      });

      handleCloseModal(); // Close modal after adding
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = (expense) => {
    setExpenseToDelete(expense);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'expenses', expenseToDelete.id));
      setOpenDeleteModal(false);
      fetchExpenses(); // Refresh the list
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setExpenseToDelete(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Add Expense
        </Button>
      </Box>
  
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : expenses.length === 0 ? (
        <Typography>No expenses found</Typography>
      ) : (
        <StyledList>
          {expenses.map((expense) => (
            <ListItem key={expense.id} divider>
              <ListItemText
                primary={expense.title || 'Untitled Expense'}
                secondary={`$${expense.amount} - ${new Date(expense.date).toLocaleDateString()}`}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={() => handleOpenModal(expense)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteExpense(expense)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </StyledList>
      )}
  
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 2 }}>
        <Button variant="outlined" onClick={handlePrevious} disabled={loading || !firstDoc}>
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNext} disabled={loading || !hasMore}>
          Next
        </Button>
      </Box>
  
      {/* Add/Edit Expense Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newExpense.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={newExpense.amount}
            onChange={handleInputChange}
            inputProps={{ step: "0.01" }}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newExpense.date}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button 
            onClick={editingExpense ? handleEditExpense : handleAddExpense}
            variant="contained"
            disabled={!newExpense.title || !newExpense.amount || !newExpense.date}
          >
            {editingExpense ? 'Save Changes' : 'Add Expense'}
          </Button>
        </DialogActions>
      </Dialog>
  
      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure you want to delete this expense?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpensesPage;