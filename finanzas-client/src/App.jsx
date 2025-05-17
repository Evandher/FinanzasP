import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography as MuiTypography,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import PieChartComponent from './components/PieChartComponent';

function App({ mode, setMode }) {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error al obtener las transacciones', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      {/* Barra de navegación */}
      <AppBar
        position="static"
        sx={{ backgroundColor: '#2c2c2c', px: 2 }}
      >
        <Toolbar>
          <MuiTypography variant="h6" sx={{ flexGrow: 1 }}>
            Finanzas Personales
          </MuiTypography>
          <IconButton onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))} color="inherit">
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contenido centrado */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: 2,
          py: 4,
          backgroundColor: mode === 'light' ? '#f5f5f5' : '#111',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {/* Formulario */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e',
                  boxShadow: 3,
                }}
              >
                <AddTransaction
                  transactions={transactions}
                  setTransactions={setTransactions}
                  editTransaction={editTransaction}
                  setEditTransaction={setEditTransaction}
                />
              </Paper>
            </Grid>

            {/* Resumen + PieChart */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Summary transactions={transactions} />
              </Box>
              <Box>
                <PieChartComponent transactions={transactions} />
              </Box>
            </Grid>

            {/* Lista de Transacciones */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e',
                  boxShadow: 3,
                }}
              >
                <TransactionList
                  transactions={transactions}
                  setTransactions={setTransactions}
                  setEditTransaction={setEditTransaction}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default App;
