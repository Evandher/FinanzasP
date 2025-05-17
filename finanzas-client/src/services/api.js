import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/transactions', // URL de tu backend
});

export const getTransactions = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener transacciones', error);
    return [];
  }
};

export const createTransaction = async (data) => {
  try {
    const response = await api.post('/', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear transacción', error);
    return null;
  }
};
