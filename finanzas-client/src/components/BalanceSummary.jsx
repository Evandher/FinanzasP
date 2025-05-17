// components/BalanceSummary.jsx
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const BalanceSummary = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <Grid container spacing={2} sx={{ my: 2 }}>
      <Grid item xs={12} sm={4}>
        <Card sx={{ backgroundColor: '#e0f7fa' }}>
          <CardContent>
            <Typography variant="h6">Ingresos</Typography>
            <Typography variant="h5" color="green">${income.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{ backgroundColor: '#ffebee' }}>
          <CardContent>
            <Typography variant="h6">Gastos</Typography>
            <Typography variant="h5" color="red">${expense.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{ backgroundColor: '#e8f5e9' }}>
          <CardContent>
            <Typography variant="h6">Saldo</Typography>
            <Typography variant="h5" color={balance >= 0 ? 'green' : 'red'}>
              ${balance.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BalanceSummary;
