import Transaction from '../models/Transaction.js';

// Obtener todas las transacciones
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
};

// Crear una nueva transacción
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    const newTransaction = new Transaction({
      type,
      amount,
      category,
      description,
      date,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos' });
  }
};

// Eliminar una transacción
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: 'Transacción no encontrada' });

    res.json({ message: 'Transacción eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar transacción' });
  }
};

// Actualizar una transacción

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error al actualizar transacción:', error);
    res.status(500).json({ message: 'Error al actualizar transacción' });
  }
};

