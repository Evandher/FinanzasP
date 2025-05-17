import { Card, CardContent, Typography, Grid } from '@mui/material';

const Resumen = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Resumen Financiero</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">Ingresos</Typography>
            <Typography variant="h6" color="green">${income.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Gastos</Typography>
            <Typography variant="h6" color="red">${expense.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">Balance</Typography>
            <Typography variant="h6" color={balance >= 0 ? "green" : "red"}>
              ${balance.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Resumen;
