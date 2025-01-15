const depenseModel = require('../models/depense');



// Get a single depense
const getDepenseById = async (req, res) => {
  try {
    const depense = await depenseModel.getDepenseById(req.params.id);
    if (!depense) return res.status(404).json({ message: 'Depense not found' });
    res.status(200).json(depense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new depense
const createDepense = async (req, res) => {
  const { amount, date, category, description } = req.body;

  try {
    // Create the depense
    const depense = await depenseModel.createDepense({ amount, date, category, description });
    res.status(201).json({ message: 'Depense created successfully', depense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all depenses (no user association)
const getAllDepenses = async (req, res) => {
  try {
    const depenses = await depenseModel.getAllDepenses();
    res.status(200).json(depenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a depense
const updateDepense = async (req, res) => {
  try {
    const rowsAffected = await depenseModel.updateDepense(req.params.id, req.body);
    if (rowsAffected === 0) return res.status(404).json({ message: 'Depense not found' });
    res.status(200).json({ message: 'Depense updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a depense
const deleteDepense = async (req, res) => {
  try {
    const rowsAffected = await depenseModel.deleteDepense(req.params.id);
    if (rowsAffected === 0) return res.status(404).json({ message: 'Depense not found' });
    res.status(200).json({ message: 'Depense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get total amount by category
const getTotalByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const total = await depenseModel.getTotalByCategory(category);
    if (total === 0) {
      return res.status(404).json({ message: 'No expenses found for this category' });
    }
    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Error calculating total for category: ' + err.message });
  }
};

// Get total amount of all expenses
const getTotalExpenses = async (req, res) => {
  try {
    const total = await depenseModel.getTotalExpenses();
    if (total === 0) {
      return res.status(404).json({ message: 'No expenses found' });
    }
    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Error calculating total expenses: ' + err.message });
  }
};


module.exports = {
  getAllDepenses,
  getDepenseById,
  createDepense,
  updateDepense,
  deleteDepense,
  getTotalByCategory,    
  getTotalExpenses,       
};
