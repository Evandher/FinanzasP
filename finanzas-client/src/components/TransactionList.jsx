import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Stack,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import axios from "axios";
import { useState } from "react";

const TransactionList = ({ transactions, setTransactions, setEditTransaction }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'income', 'expense'
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const confirmDelete = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${selectedTransaction._id}`);
      setTransactions(transactions.filter(t => t._id !== selectedTransaction._id));
    } catch (error) {
      console.error("Error al eliminar", error);
    } finally {
      setOpenDialog(false);
      setSelectedTransaction(null);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
        <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')}>Todos</Button>
        <Button variant={filter === 'income' ? 'contained' : 'outlined'} onClick={() => setFilter('income')}>Ingresos</Button>
        <Button variant={filter === 'expense' ? 'contained' : 'outlined'} onClick={() => setFilter('expense')}>Gastos</Button>
      </Stack>

      <List>
        {filteredTransactions.map((transaction) => (
          <div key={transaction._id}>
            <ListItem
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <IconButton color="primary" onClick={() => setEditTransaction(transaction)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => confirmDelete(transaction)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <Stack direction="row" spacing={2} alignItems="center" width="100%">
                {transaction.type === 'income' ? (
                  <ArrowCircleUpIcon color="success" />
                ) : (
                  <ArrowCircleDownIcon color="error" />
                )}

                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      ${transaction.amount.toFixed(2)}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.description || 'Sin descripción'}
                      </Typography>
                      <Chip label={transaction.category} size="small" sx={{ mt: 0.5 }} />
                    </>
                  }
                />
              </Stack>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Estás seguro de eliminar esta transacción?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionList;
