import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Example data for expenses
// const expenses = [
//   { title: 'Office Supplies', category: 'Office', date: '2025-03-01', amount: 50.00 },
//   { title: 'Business Lunch', category: 'Food', date: '2025-03-03', amount: 35.75 },
//   { title: 'Travel to Conference', category: 'Travel', date: '2025-03-05', amount: 200.00 },
//   { title: 'Software Subscription', category: 'Software', date: '2025-03-07', amount: 120.00 },
// ];

const ExpenseList = ({expenses,handleOpenModal,handleDeleteExpense}) => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Expense List
      </Typography>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          expenses?.length?
          expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.title || 'Untitled Expense'}</TableCell>
              <TableCell>{expense.category || 'N/A'}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>${expense?.amount?.toFixed(2) || ''}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleOpenModal(expense)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteExpense(expense)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))
        :''}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default ExpenseList;
