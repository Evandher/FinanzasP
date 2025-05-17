import React, { useEffect, useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import axios from 'axios';

const AddTransaction = ({ transactions, setTransactions, editTransaction, setEditTransaction }) => {
  const [form, setForm] = useState({
    type: 'income',
    amount: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    if (editTransaction) {
      setForm(editTransaction); // cargar datos al formulario
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTransaction) {
      // ACTUALIZAR
      try {
        const response = await axios.put(`http://localhost:5000/api/transactions/${editTransaction._id}`, form);
        const updatedList = transactions.map(t =>
          t._id === editTransaction._id ? response.data : t
        );
        setTransactions(updatedList);
        setEditTransaction(null); // salir del modo edición
      } catch (error) {
        console.error("Error al actualizar", error);
      }
    } else {
      // AGREGAR
      try {
        const response = await axios.post('http://localhost:5000/api/transactions', form);
        setTransactions([...transactions, response.data]);
      } catch (error) {
        console.error("Error al agregar", error);
      }
    }

    setForm({ type: 'income', amount: '', category: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {editTransaction ? 'Editar Transacción' : 'Agregar Nueva Transacción'}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        <TextField
          select
          name="type"
          label="Tipo"
          value={form.type}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="income">Ingreso</MenuItem>
          <MenuItem value="expense">Gasto</MenuItem>
        </TextField>

        <TextField
          name="amount"
          label="Monto"
          type="number"
          value={form.amount}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          name="category"
          label="Categoría"
          value={form.category}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="description"
          label="Descripción"
          value={form.description}
          onChange={handleChange}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          {editTransaction ? 'Actualizar' : 'Agregar'}
        </Button>
      </Stack>
    </form>
  );
};

export default AddTransaction;
